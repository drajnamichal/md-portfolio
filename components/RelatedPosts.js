import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function RelatedPosts({ currentPost, allPosts }) {
  // Find posts that share tags with the current post
  const relatedPosts = allPosts
    .filter(
      post =>
        post.slug !== currentPost.slug && // Exclude current post
        post.tags.some(tag => currentPost.tags.includes(tag)) // Must share at least one tag
    )
    .slice(0, 3); // Limit to 3 related posts

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-40 w-full">
                {post.coverImage && (
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
