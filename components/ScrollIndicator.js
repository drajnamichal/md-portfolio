import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Show up arrow when scrolled down, down arrow when at top
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);

      // Hide the indicator when very close to bottom of page
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setIsVisible(!isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isScrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-50 hover:scale-110 transition-transform"
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: 1,
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      onClick={handleClick}
      title={isScrolled ? "Scroll to top" : "Scroll down"}
    >
      <svg
        className={`w-8 h-8 text-teal-500 dark:text-teal-400 transition-transform duration-300 ${
          isScrolled ? 'rotate-180' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </motion.div>
  );
} 