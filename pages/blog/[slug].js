import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaCopy } from 'react-icons/fa';
import { useState } from 'react';
import RelatedPosts from '../../components/RelatedPosts';

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

export default function BlogPost({ post, allPosts }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const readingTime = calculateReadingTime(post.content);

  const handleShare = async platform => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        );
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL:', err);
        }
        break;
    }
  };

  return (
    <Layout description={post.excerpt} image={post.coverImage}>
      <article className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {post.coverImage && (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="mx-2">•</span>
              <span>{readingTime} min read</span>
              <span className="mx-2">•</span>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-sm bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share buttons */}
          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Share this article:</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare('twitter')}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
              aria-label="Share on Twitter"
            >
              <FaTwitter size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare('linkedin')}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare('copy')}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
              aria-label="Copy link"
            >
              <FaCopy size={20} />
            </motion.button>
            {copySuccess && (
              <span className="text-sm text-teal-600 dark:text-teal-400">Link copied!</span>
            )}
          </div>

          {/* Related Posts */}
          <RelatedPosts currentPost={post} allPosts={allPosts} />
        </motion.div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      params: {
        slug: filename.replace('.md', ''),
      },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = marked(content);

  // Get all posts for related posts feature
  const filenames = fs.readdirSync(postsDirectory);
  const allPosts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const postPath = path.join(postsDirectory, filename);
      const postContents = fs.readFileSync(postPath, 'utf8');
      const { data } = matter(postContents);

      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        tags: data.tags || [],
      };
    });

  return {
    props: {
      post: {
        slug: params.slug,
        content: htmlContent,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        tags: data.tags || [],
      },
      allPosts,
    },
  };
}
