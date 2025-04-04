import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Get current visitor count
        const { data: countData } = await supabase
          .from('visitor_count')
          .select('count')
          .single();

        // Get client IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        // Check if this IP has visited in the last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const { data: existingVisit } = await supabase
          .from('visitor_ips')
          .select('*')
          .eq('ip', ip)
          .gte('visited_at', twentyFourHoursAgo.toISOString())
          .single();

        if (!existingVisit) {
          // This is a new visit
          const newCount = (countData?.count || 0) + 1;

          // Update the total count
          await supabase
            .from('visitor_count')
            .upsert({ id: 1, count: newCount });

          // Record this IP visit
          await supabase
            .from('visitor_ips')
            .insert({
              ip: ip,
              visited_at: new Date().toISOString()
            });
        }
      } catch (error) {
        // Silently log error without affecting the user experience
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, []);

  // This component doesn't render anything
  return null;
} 