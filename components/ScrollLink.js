import { motion } from 'framer-motion';
import { useCallback } from 'react';

export default function ScrollLink({ href, children, className = '' }) {
  const handleScroll = useCallback(
    e => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          window.history.pushState({}, '', href);
        });
      }
    },
    [href]
  );

  return (
    <motion.a
      href={href}
      onClick={handleScroll}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Add will-change hint for better performance
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.a>
  );
}
