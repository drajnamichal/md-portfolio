import Layout from "../components/Layout";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TestCrunch() {
  const images = [
    {
      src: "/tc1.jpg",
      alt: "TestCrunch Conference - Presentation"
    },
    {
      src: "/tc2.jpg",
      alt: "TestCrunch Conference - Event"
    },
    {
      src: "/tc3.jpg",
      alt: "TestCrunch Conference - Audience"
    }
  ];

  return (
    <Layout
      title="TestCrunch Conference 2024 | Michal Drajna"
      description="My presentation about Test Automation with Playwright at TestCrunch Conference 2024"
      image="/tc1.jpg"
    >
      <div className="min-h-screen pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-6">
              TestCrunch Conference 2024
            </h1>
            
            <div className="prose dark:prose-invert max-w-none mb-12">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                I had the privilege of speaking at TestCrunch Conference 2024, where I presented on "Test Automation with Playwright". 
                The conference brought together testing professionals from across the region to discuss modern testing approaches and best practices.
              </p>

              <h2 className="text-2xl font-semibold text-teal-600 mb-4">
                Presentation Highlights
              </h2>
              
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li>Introduction to Playwright and its advantages</li>
                <li>Real-world examples of test automation</li>
                <li>Best practices for implementing Playwright tests</li>
                <li>Advanced features and debugging techniques</li>
                <li>Integration with CI/CD pipelines</li>
              </ul>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                The presentation was well-received, generating engaging discussions about modern testing approaches 
                and how Playwright is revolutionizing the way we think about test automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative h-64 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                  />
                </motion.div>
              ))}
            </div>

            <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-semibold text-teal-600 mb-4">
                Key Takeaways
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>Modern approaches to test automation with Playwright</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>Strategies for reliable and maintainable tests</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <span>Tips for successful test automation implementation</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 