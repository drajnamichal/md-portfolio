import Layout from "../components/Layout";
import Image from "next/image";
import { FaNewspaper, FaPodcast, FaYoutube, FaMedium } from "react-icons/fa";

export default function Featured() {
  const featuredItems = [
    {
      type: "Interview",
      title: "Honoring #IconsOfQuality: Michal Drajna, QA Engineer",
      platform: "BrowserStack",
      date: "September 2024",
      description: "Featured in BrowserStack's #IconsOfQuality series, sharing insights about test automation, AI in testing, and productivity tips for QA professionals.",
      link: "https://www.browserstack.com/blog/honoring-iconsofquality-michal-drajna/",
      icon: FaNewspaper,
      image: "/bs-michal.png"
    },
    {
      type: "Conference",
      title: "Test Automation with Playwright",
      platform: "TestCrunch Conference",
      date: "March 2024",
      description: "Presented modern testing approaches and Playwright capabilities at TestCrunch Conference, sharing insights about efficient test automation strategies.",
      link: "/testcrunch",
      icon: FaNewspaper,
      image: "/tc1.jpg"
    },
    {
      type: "Article",
      title: "Playwright vs Selenium vs Cypress: Which Tool is Best for Automated Testing?",
      platform: "Skillmea",
      date: "July 2023",
      description: "A comprehensive comparison of the most popular test automation tools, helping you choose the right one for your needs.",
      link: "https://skillmea.sk/blog/playwright-vs-selenium-vs-cypress",
      icon: FaNewspaper,
      image: "/pwcysel.png"
    },
    {
      type: "Video",
      title: "Playwright: The Future of Test Automation?",
      platform: "Nauč mě IT",
      date: "March 2024",
      description: "A comprehensive presentation about Playwright's powerful capabilities, including auto-waiting, codegen, tracing, and parallel execution. Discover why Playwright is becoming the go-to choice for modern web automation and how it's shaping the future of testing.",
      link: "https://www.youtube.com/live/tz7dfBxkYDA?si=rHDQQbNx31EKSjCZ",
      icon: FaYoutube,
      image: "/yt.jpg"
    }
  ];

  return (
    <Layout
      title="Featured In | Michal Drajna"
      description="Check out where Michal Drajna has been featured in media, podcasts, and technical publications."
      image="/featured.jpg"
    >
      <div className="min-h-screen pt-24 md:pt-32">
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
                target={item.link.startsWith('http') ? "_blank" : undefined}
                rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {item.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
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
                    {item.type === "Video" ? "Watch it" : "Read More"}
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