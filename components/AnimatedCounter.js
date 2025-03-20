import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = counterRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = null;
    const targetValue = parseInt(value);
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * targetValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-2xl md:text-3xl font-bold text-teal-600 dark:text-teal-400"
    >
      {prefix}{count}{suffix}
    </motion.div>
  );
} 