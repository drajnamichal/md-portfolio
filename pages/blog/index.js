import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Blog({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Get unique tags from all posts
  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [posts]);

  // Filter posts based on search term and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  return (
    <Layout
      title="Blog - Michal Drajna | Senior QA Engineer"
      description="Articles and insights about test automation, QA practices, and software testing from Michal Drajna."
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Blog</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-3 py-1 rounded-full text-sm ${
                !selectedTag
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === tag
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 w-full">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <div className="mx-2">•</div>
                      <div className="flex gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center">
                      <span className="text-teal-600 dark:text-teal-400">Read more →</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
              No articles found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        tags: data.tags || []
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      posts
    }
  };
} 