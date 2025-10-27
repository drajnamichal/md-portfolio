import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, courseId } = req.body;

    if (!email || !courseId) {
      return res.status(400).json({ error: 'Email and course ID are required' });
    }

    // Check if user has active access to the course
    const { data, error } = await supabase
      .from('course_access')
      .select('*')
      .eq('email', email)
      .eq('course_id', courseId)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return res.status(200).json({ hasAccess: false });
    }

    // Check if access has expired (if expires_at is set)
    if (data.expires_at) {
      const now = new Date();
      const expiresAt = new Date(data.expires_at);
      if (now > expiresAt) {
        return res.status(200).json({ hasAccess: false });
      }
    }

    res.status(200).json({ hasAccess: true, access: data });
  } catch (error) {
    console.error('Error verifying access:', error);
    res.status(500).json({ error: 'Failed to verify access' });
  }
}
