import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseId, email } = req.query;

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    // If email is provided, verify access
    let hasAccess = false;
    if (email) {
      const { data: accessData } = await supabase
        .from('course_access')
        .select('*')
        .eq('email', email)
        .eq('course_id', courseId)
        .eq('is_active', true)
        .single();

      if (accessData) {
        // Check expiration
        if (!accessData.expires_at || new Date(accessData.expires_at) > new Date()) {
          hasAccess = true;
        }
      }
    }

    // Get videos
    const { data: videos, error } = await supabase
      .from('course_videos')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching videos:', error);
      return res.status(500).json({ error: 'Failed to fetch videos' });
    }

    // Filter videos based on access
    const filteredVideos = videos.map(video => {
      if (video.is_free_preview || hasAccess) {
        return video;
      } else {
        // Return limited info for locked videos
        return {
          id: video.id,
          title: video.title,
          description: video.description,
          duration: video.duration,
          order_index: video.order_index,
          is_free_preview: video.is_free_preview,
          locked: true,
        };
      }
    });

    res.status(200).json({ videos: filteredVideos, hasAccess });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
