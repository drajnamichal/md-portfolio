import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaTag } from 'react-icons/fa';

export default function BlogCard({ post }) {
  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {post.coverImage && (
        <div className="relative h-48 w-full">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-sm bg-teal-600 text-white rounded-full flex items-center">
                <FaTag className="mr-2" />
                {post.category}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <FaClock className="mr-2" />
          <span>{post.readTime} min read</span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 dark:text-white leading-none">{post.date}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
