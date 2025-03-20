/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import Link from "next/link";
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {AiFillFacebook, AiFillLinkedin, AiFillGithub, AiFillMail} from 'react-icons/ai';
import Image from 'next/image';
import playwright from '../public/playwright.png';
import { useState } from "react";

export default function Workshops() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Playwright Workshops - Michal Drajna</title>
        <meta name="description" content="Professional Playwright automation workshops by Michal Drajna" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between items-center">
            <Link href="/" className="text-xl font-burtons dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              ← Back to Home
            </Link>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl dark:text-white"
                />
              </li>
            </ul>
          </nav>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
                Playwright Workshops
              </h2>
              <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
                Master End-to-End Testing with Playwright
              </h3>
              <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-3xl mx-auto dark:text-gray-200">
                Join our comprehensive workshop to learn how to create reliable, maintainable, and efficient end-to-end tests using Playwright. Perfect for QA engineers, developers, and teams looking to improve their automation testing skills.
              </p>
            </div>

            <div className="flex justify-center mb-16">
              <Image src={playwright} width={200} height={200} className="rounded-xl shadow-lg" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 dark:text-white text-center">Workshop Highlights</h3>
                <ul className="space-y-4 text-gray-800 dark:text-gray-200">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Introduction to Playwright and its key features
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Setting up your first Playwright test project
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Writing and organizing test cases effectively
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Advanced selectors and element interactions
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Handling authentication and state management
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    API testing with Playwright
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Visual testing and screenshot comparisons
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    CI/CD integration best practices
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Performance testing and reporting
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Best practices and common pitfalls to avoid
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 dark:text-white text-center">Who Should Attend?</h3>
                <ul className="space-y-4 text-gray-800 dark:text-gray-200">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    QA Engineers looking to enhance their automation skills
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Developers interested in end-to-end testing
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Teams transitioning to Playwright from other frameworks
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    Anyone interested in modern web testing approaches
                  </li>
                </ul>

                <div className="mt-8">
                  <h4 className="text-xl font-semibold mb-4 dark:text-white text-center">What to expect:</h4>
                  <ul className="space-y-4 text-gray-800 dark:text-gray-200">
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      Personalized workshop planning
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      Flexible scheduling options (online or in-person)
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      Customized content for your needs
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      Detailed pricing based on group size
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center space-y-8 mb-16">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-2xl mx-auto">
                <p className="text-sm text-yellow-700">
                  Please note: The registration form and workshop are available in Slovak and Czech languages only.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://forms.gle/n8fXKZ7ZCGEyWrMbA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors inline-block"
                >
                  Register Your Interest
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  By registering, you'll receive detailed information about workshop dates, pricing, and customization options.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-gray-800 dark:text-gray-200">
                  Have questions? Contact me at{" "}
                  <a
                    href="mailto:michal.drajna@gmail.com"
                    className="text-teal-600 hover:text-teal-700"
                  >
                    michal.drajna@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 