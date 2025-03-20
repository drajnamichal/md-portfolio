import { motion } from 'framer-motion';

export default function HoverCard({ children, className = '' }) {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
} 