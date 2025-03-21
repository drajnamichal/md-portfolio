import Layout from "../components/Layout";
import Image from "next/image";
import tc1 from '../public/tc1.jpg';
import tc2 from '../public/tc2.jpg';
import tc3 from '../public/tc3.jpg';
import { motion } from 'framer-motion';

export default function TestCrunch() {
  return (
    <Layout
      title="TestCrunch Conference | Michal Drajna"
      description="My presentation at TestCrunch Conference about test automation and Playwright"
      image="/tc1.jpg"
    >
      <div className="min-h-screen pt-24 md:pt-32">
        <div className="text-center mb-16">
          <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
            TestCrunch Conference
          </h2>
          <p className="text-md py-5 leading-8 text-gray-800 dark:text-white md:text-xl max-w-2xl mx-auto">
            I had the honor of being a speaker at TestCrunch Conference, where I shared insights about test automation and Playwright.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-64 md:h-96">
              <Image
                src={tc1}
                alt="TestCrunch Conference Presentation 1"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src={tc2}
                alt="TestCrunch Conference Presentation 2"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="relative h-64 md:h-96 md:col-span-2">
              <Image
                src={tc3}
                alt="TestCrunch Conference Presentation 3"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-8 text-gray-800 dark:text-gray-200">
              I was honored to be invited as a speaker at TestCrunch Conference, where I had the opportunity to share my expertise in test automation. During my presentation, I discussed modern testing approaches, with a particular focus on Playwright and its capabilities. The conference provided an excellent platform to connect with fellow testing professionals and share knowledge about the latest trends in quality assurance.
            </p>
            <p className="text-lg leading-8 text-gray-800 dark:text-gray-200 mt-4">
              The presentation covered various aspects of test automation, including best practices, common challenges, and practical solutions. I demonstrated how Playwright can be effectively used to create reliable and maintainable test suites, and shared real-world examples from my experience.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 