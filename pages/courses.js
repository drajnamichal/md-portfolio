/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import Layout from "../components/Layout";
import skillmea from '../public/skillmea.jpg';
import advanced from '../public/advanced.jpg';

export default function Courses() {
  const courses = [
    {
      title: "Test Automation in Playwright",
      description: "Learn the fundamentals of test automation using Playwright. This comprehensive course covers everything from basic concepts to advanced testing techniques.",
      image: skillmea,
      link: "https://skillmea.sk/online-kurzy/test-automatizacia-playwright",
      topics: [
        "Introduction to Playwright",
        "Setting up your first test",
        "Selectors and element interactions",
        "Test organization and best practices",
        "Handling different scenarios",
        "Reporting and CI/CD integration"
      ]
    },
    {
      title: "Advanced Playwright",
      description: "Take your Playwright skills to the next level. This advanced course covers complex testing scenarios and professional automation techniques.",
      image: advanced,
      link: "https://skillmea.sk/online-kurzy/playwright-pre-pokrocilych",
      topics: [
        "Advanced test patterns",
        "API testing with Playwright",
        "Visual testing strategies",
        "Performance testing",
        "Custom test reporters",
        "Advanced automation patterns"
      ]
    }
  ];

  return (
    <Layout 
      title="Playwright Testing Courses | Michal Drajna"
      description="Learn test automation with Playwright through comprehensive online courses. From beginner to advanced levels, master modern testing techniques with practical examples."
      image="/skillmea.jpg"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
          Online Courses
        </h2>
        <p className="text-md py-5 leading-8 text-gray-800 dark:text-white md:text-xl max-w-2xl mx-auto">
          Master test automation with my comprehensive Playwright courses. From fundamentals to advanced techniques, learn everything you need to become a testing expert.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {courses.map((course, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <a href={course.link} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative h-64 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {course.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    What you'll learn:
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {course.topics.map((topic, topicIndex) => (
                      <li 
                        key={topicIndex}
                        className="text-sm text-gray-600 dark:text-gray-300 flex items-center"
                      >
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <span className="inline-block bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                    Learn More
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
} 