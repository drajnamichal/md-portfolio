import Layout from "../components/Layout";
import Image from "next/image";
import { FaNewspaper, FaPodcast, FaYoutube, FaMedium } from "react-icons/fa";

export default function Featured() {
  const featuredItems = [
    {
      type: "Article",
      title: "Test Automation with Playwright",
      platform: "Medium",
      date: "2024",
      description: "An in-depth article about modern test automation approaches using Playwright.",
      link: "#",
      icon: FaMedium
    },
    {
      type: "Podcast",
      title: "The Future of Testing",
      platform: "Testing Podcast",
      date: "2023",
      description: "Discussion about the evolution of test automation and best practices in the industry.",
      link: "#",
      icon: FaPodcast
    },
    {
      type: "Video",
      title: "Playwright Workshop",
      platform: "YouTube",
      date: "2023",
      description: "Live workshop demonstrating advanced Playwright testing techniques.",
      link: "#",
      icon: FaYoutube
    },
    {
      type: "Article",
      title: "E2E Testing Best Practices",
      platform: "Tech Blog",
      date: "2023",
      description: "Expert insights on end-to-end testing strategies and implementation.",
      link: "#",
      icon: FaNewspaper
    }
  ];

  return (
    <Layout
      title="Featured In | Michal Drajna"
      description="Check out where Michal Drajna has been featured in media, podcasts, and technical publications."
      image="/featured.jpg"
    >
      <div className="min-h-screen pt-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
            Featured In
          </h2>
          <p className="text-md py-5 leading-8 text-gray-800 dark:text-white md:text-xl max-w-2xl mx-auto">
            Discover my contributions to the testing community through various media appearances, articles, and speaking engagements.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {featuredItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <item.icon className="text-teal-600 text-2xl mr-3" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.type} • {item.platform}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center text-teal-600 text-sm font-medium">
                    Read More
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 