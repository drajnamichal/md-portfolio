import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { FaNewspaper, FaPodcast, FaYoutube, FaMedium } from 'react-icons/fa';
import { useState } from 'react';

// This enables Static Site Generation (SSG)
export async function getStaticProps() {
  const featuredItems = [
    {
      type: 'Interview',
      title: 'Honoring #IconsOfQuality: Michal Drajna, QA Engineer',
      platform: 'BrowserStack',
      date: 'September 2024',
      description:
        "Featured in BrowserStack's #IconsOfQuality series, sharing insights about test automation, AI in testing, and productivity tips for QA professionals.",
      link: 'https://www.browserstack.com/blog/honoring-iconsofquality-michal-drajna/',
      icon: 'FaNewspaper',
      image: '/bs-michal.png',
    },
    {
      type: 'Conference',
      title: 'Test Automation with Playwright',
      platform: 'TestCrunch Conference',
      date: 'March 2024',
      description:
        'Presented modern testing approaches and Playwright capabilities at TestCrunch Conference, sharing insights about efficient test automation strategies.',
      link: '/testcrunch',
      icon: 'FaNewspaper',
      image: '/tc1.jpg',
    },
    {
      type: 'Article',
      title: 'Playwright vs Selenium vs Cypress: Which Tool is Best for Automated Testing?',
      platform: 'Skillmea',
      date: 'July 2023',
      description:
        'A comprehensive comparison of the most popular test automation tools, helping you choose the right one for your needs.',
      link: 'https://skillmea.sk/blog/playwright-vs-selenium-vs-cypress',
      icon: 'FaNewspaper',
      image: '/pwcysel.png',
    },
    {
      type: 'Video',
      title: 'Playwright: The Future of Test Automation?',
      platform: 'Nauč mě IT',
      date: 'March 2024',
      description:
        "A comprehensive presentation about Playwright's powerful capabilities, including auto-waiting, codegen, tracing, and parallel execution. Discover why Playwright is becoming the go-to choice for modern web automation and how it's shaping the future of testing.",
      link: 'https://www.youtube.com/live/tz7dfBxkYDA?si=rHDQQbNx31EKSjCZ',
      icon: 'FaYoutube',
      image: '/yt.jpg',
    },
  ];

  return {
    props: {
      featuredItems,
    },
  };
}

export default function Featured({ featuredItems }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const IconComponent = {
    FaNewspaper,
    FaPodcast,
    FaYoutube,
    FaMedium,
  };

  return (
    <Layout
      title="Featured Projects - Michal Drajna's Portfolio"
      description="Explore my featured projects and case studies"
    >
      <div className="min-h-screen pt-24 md:pt-32 bg-white dark:bg-gray-900">
        <div className="text-center mb-16">
          <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">Featured In</h2>
          <p className="text-md py-5 leading-8 text-gray-800 dark:text-white md:text-xl max-w-2xl mx-auto">
            Discover my contributions to the testing community through various media appearances,
            articles, and speaking engagements.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, index) => {
              const Icon = IconComponent[item.icon];
              return item.link.startsWith('http') ? (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {renderCard(item, index, Icon)}
                </a>
              ) : (
                <Link
                  key={index}
                  href={item.link}
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  prefetch={true}
                >
                  {renderCard(item, index, Icon)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );

  function renderCard(item, index, Icon) {
    return (
      <>
        {item.image && (
          <div className="relative w-full h-48 md:h-64 mb-4 overflow-hidden rounded-lg">
            <div
              className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${
                !isImageLoading ? 'hidden' : ''
              }`}
            />
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={`object-cover transform transition-all duration-500 hover:scale-105 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              onLoadingComplete={() => setIsImageLoading(false)}
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Icon className="text-teal-600 text-2xl mr-3" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.type} • {item.platform}
              </span>
            </div>
            <span className="text-sm text-gray-400">{item.date}</span>
          </div>
          <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
          <div className="mt-4 flex items-center text-teal-600 text-sm font-medium">
            {item.type === 'Video' ? 'Watch it' : 'Read More'}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </>
    );
  }
}
