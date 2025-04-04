import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FaHome, FaBlog, FaProjectDiagram } from 'react-icons/fa';

export default function Custom404() {
  return (
    <Layout description="Page not found - Michal Drajna's portfolio">
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-8xl font-bold text-teal-600 dark:text-teal-400 mb-4"
          >
            404
          </motion.h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
            you back on track!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <FaHome className="text-xl" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <FaBlog className="text-xl" />
              <span>Read Blog</span>
            </Link>
            <Link
              href="/featured"
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <FaProjectDiagram className="text-xl" />
              <span>View Projects</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
