import { motion } from 'framer-motion';

export default function ScrollLink({ href, children, className = '' }) {
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Update URL without a page refresh
      window.history.pushState({}, '', href);
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleScroll}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
} 