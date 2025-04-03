import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const getVisitorCount = async () => {
      try {
        // Get current visitor count
        const { data: countData } = await supabase
          .from('visitor_count')
          .select('count')
          .single();

        if (countData) {
          setVisitorCount(countData.count);
        }

        // Get client IP address using a free IP API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        // Check if this IP has visited in the last 24 hours
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getTime() - 24 * 60 * 60 * 1000);

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

          setVisitorCount(newCount);
        }
      } catch (error) {
        console.error('Error handling visitor count:', error);
      }
    };

    getVisitorCount();
  }, []);

  return (
    <div className="text-sm text-gray-400 dark:text-gray-500">
      <span>{visitorCount.toLocaleString()} unique visitors</span>
    </div>
  );
} 