import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Disable body parsing, need raw body for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const { courseId, email } = session.metadata;

      // Insert purchase record
      const { data: purchase, error: purchaseError } = await supabase
        .from('course_purchases')
        .insert({
          email,
          course_id: courseId,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent,
          amount_paid: session.amount_total,
          currency: session.currency,
          status: 'completed',
        })
        .select()
        .single();

      if (purchaseError) {
        console.error('Error inserting purchase:', purchaseError);
        return res.status(500).json({ error: 'Failed to record purchase' });
      }

      // Grant course access
      const { error: accessError } = await supabase.from('course_access').insert({
        email,
        course_id: courseId,
        purchase_id: purchase.id,
        is_active: true,
        expires_at: null, // Lifetime access
      });

      if (accessError) {
        console.error('Error granting access:', accessError);
        return res.status(500).json({ error: 'Failed to grant access' });
      }

      console.log(`Access granted to ${email} for course ${courseId}`);
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ error: 'Failed to process payment' });
    }
  }

  res.json({ received: true });
}
