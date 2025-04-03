import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        // First, get the current count
        const { data: currentCount } = await supabase
          .from('visitor_count')
          .select('count')
          .single();

        const newCount = (currentCount?.count || 0) + 1;

        // Update the count
        const { error } = await supabase
          .from('visitor_count')
          .upsert({ id: 1, count: newCount });

        if (error) throw error;
        
        setVisitorCount(newCount);
      } catch (error) {
        console.error('Error updating visitor count:', error);
      }
    };

    incrementVisitorCount();
  }, []);

  return (
    <div className="text-center p-4">
      <p className="text-lg font-semibold">Visitors</p>
      <span className="text-2xl font-bold">{visitorCount}</span>
    </div>
  );
} 