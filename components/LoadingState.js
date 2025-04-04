import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
