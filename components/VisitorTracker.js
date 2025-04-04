import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function VisitorTracker() {
  const router = useRouter();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Get current visitor count
        const { data: countData } = await supabase.from('visitor_count').select('count').single();

        // Get client IP address and location data
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();

        const visitorData = {
          ip: ipData.ip,
          city: ipData.city,
          region: ipData.region,
          country: ipData.country_name,
          timezone: ipData.timezone,
          visited_at: new Date().toISOString(),
          user_agent: window.navigator.userAgent,
          language: window.navigator.language,
          page_visited: router.pathname,
          referrer: document.referrer || null,
        };

        // Check if this IP has visited in the last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const { data: existingVisit } = await supabase
          .from('visitor_ips')
          .select('*')
          .eq('ip', ipData.ip)
          .gte('visited_at', twentyFourHoursAgo.toISOString())
          .single();

        if (!existingVisit) {
          // This is a new visit
          const newCount = (countData?.count || 0) + 1;

          // Update the total count
          await supabase.from('visitor_count').upsert({ id: 1, count: newCount });

          // Record this IP visit with additional data
          await supabase.from('visitor_ips').insert(visitorData);
        }
      } catch (error) {
        // Silently log error without affecting the user experience
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, [router.pathname]); // Track when pathname changes

  // This component doesn't render anything
  return null;
}
