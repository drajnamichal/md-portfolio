import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVisitorCount = async () => {
      try {
        console.log('Fetching visitor count...');
        
        // Get current visitor count
        const { data: countData, error: countError } = await supabase
          .from('visitor_count')
          .select('count')
          .single();

        if (countError) {
          throw new Error(`Error fetching count: ${countError.message}`);
        }

        console.log('Current count data:', countData);
        
        if (countData) {
          setVisitorCount(countData.count);
        }

        // Get client IP address
        console.log('Fetching IP address...');
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();
        console.log('Visitor IP:', ip);

        // Check if this IP has visited in the last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        console.log('Checking visits since:', twentyFourHoursAgo.toISOString());

        const { data: existingVisit, error: visitError } = await supabase
          .from('visitor_ips')
          .select('*')
          .eq('ip', ip)
          .gte('visited_at', twentyFourHoursAgo.toISOString())
          .single();

        if (visitError && visitError.code !== 'PGRST116') { // Ignore "no rows returned" error
          throw new Error(`Error checking existing visit: ${visitError.message}`);
        }

        console.log('Existing visit data:', existingVisit);

        if (!existingVisit) {
          console.log('Recording new visit...');
          // This is a new visit
          const newCount = (countData?.count || 0) + 1;

          // Update the total count
          const { error: updateError } = await supabase
            .from('visitor_count')
            .upsert({ id: 1, count: newCount });

          if (updateError) {
            throw new Error(`Error updating count: ${updateError.message}`);
          }

          // Record this IP visit
          const { error: insertError } = await supabase
            .from('visitor_ips')
            .insert({
              ip: ip,
              visited_at: new Date().toISOString()
            });

          if (insertError) {
            throw new Error(`Error recording IP: ${insertError.message}`);
          }

          console.log('New visit recorded, count updated to:', newCount);
          setVisitorCount(newCount);
        }
      } catch (error) {
        console.error('Error handling visitor count:', error);
        setError(error.message);
      }
    };

    getVisitorCount();
  }, []);

  return (
    <div className="text-sm text-gray-400 dark:text-gray-500">
      <span>{visitorCount.toLocaleString()} unique visitors</span>
      {error && (
        <div className="text-red-500 text-xs mt-1">
          Error: {error}
        </div>
      )}
    </div>
  );
} 