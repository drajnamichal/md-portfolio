import { useState } from 'react';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function CopyCodeButton({ code }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={copyToClipboard}
      className="absolute top-2 right-2 p-2 rounded-md bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 hover:text-white transition-colors"
      title="Copy code"
    >
      {copied ? <FaCheck className="w-4 h-4 text-green-400" /> : <FaRegCopy className="w-4 h-4" />}
    </motion.button>
  );
}
