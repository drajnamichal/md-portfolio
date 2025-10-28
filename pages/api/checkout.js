import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseId, email } = req.body;

    if (!courseId || !email) {
      return res.status(400).json({ error: 'Course ID and email are required' });
    }

    // Check if Stripe is properly configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return res
        .status(500)
        .json({ error: 'Payment system not configured. Please contact support.' });
    }

    // Define course prices
    const coursePrices = {
      'playwright-mcp': {
        price: 9900, // $99.00 in cents
        name: 'Playwright MCP & Agents Course',
        description:
          'Complete guide to mastering Playwright with Model Context Protocol and AI Agents',
      },
    };

    const course = coursePrices[courseId];

    if (!course) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.name,
              description: course.description,
              images: [`${process.env.NEXT_PUBLIC_APP_URL}/playwright.png`],
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      customer_email: email,
      metadata: {
        courseId,
        email,
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    // Provide more specific error information
    let errorMessage = 'Failed to create checkout session';

    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = 'Invalid payment configuration. Please contact support.';
    } else if (error.type === 'StripeAPIError') {
      errorMessage = 'Payment service temporarily unavailable. Please try again.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
}
