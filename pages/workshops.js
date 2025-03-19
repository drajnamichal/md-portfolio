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
          <nav className="py-10 mb-12 flex justify-between">
            <Link href="/" className="text-xl font-burtons dark:text-white">
              developedbymichal
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

          <div className="text-center">
            <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
              Playwright Workshops
            </h2>
            <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
              Master End-to-End Testing with Playwright
            </h3>
            <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-4xl mx-auto dark:text-gray-200">
              Join our comprehensive workshop to learn how to create reliable, maintainable, and efficient end-to-end tests using Playwright. Perfect for QA engineers, developers, and teams looking to improve their automation testing skills.
            </p>
          </div>

          <div className="flex justify-center my-10">
            <Image src={playwright} width={200} height={200} className="rounded-xl" />
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl py-1 dark:text-white">Workshop Highlights</h3>
            <div className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              <ul className="list-disc pl-5 space-y-2">
                <li>Introduction to Playwright and its key features</li>
                <li>Setting up your first Playwright test project</li>
                <li>Writing and organizing test cases effectively</li>
                <li>Advanced selectors and element interactions</li>
                <li>Handling authentication and state management</li>
                <li>API testing with Playwright</li>
                <li>Visual testing and screenshot comparisons</li>
                <li>CI/CD integration best practices</li>
                <li>Performance testing and reporting</li>
                <li>Best practices and common pitfalls to avoid</li>
              </ul>
            </div>

            <h3 className="text-3xl py-1 mt-8 dark:text-white">Who Should Attend?</h3>
            <div className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              <ul className="list-disc pl-5 space-y-2">
                <li>QA Engineers looking to enhance their automation skills</li>
                <li>Developers interested in end-to-end testing</li>
                <li>Teams transitioning to Playwright from other frameworks</li>
                <li>Anyone interested in modern web testing approaches</li>
              </ul>
            </div>

            <div className="text-center mt-10 space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 max-w-2xl mx-auto">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Please note: The registration form and workshop are available in Slovak and Czech languages only.
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="https://forms.gle/n8fXKZ7ZCGEyWrMbA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors inline-block"
              >
                Register Your Interest
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                By registering, you'll receive detailed information about workshop dates, pricing, and customization options.
              </p>
            </div>

            <div className="text-md py-8 leading-8 text-gray-800 dark:text-gray-200 text-center mt-4">
              <h4 className="text-xl font-semibold mb-4 dark:text-white">What to expect after registration:</h4>
              <ul className="text-left max-w-2xl mx-auto space-y-2">
                <li>• Personalized workshop planning based on your team's experience level</li>
                <li>• Flexible scheduling options (online or in-person)</li>
                <li>• Customized content focusing on your specific testing needs</li>
                <li>• Detailed pricing information based on group size and requirements</li>
              </ul>
            </div>

            <div className="text-md py-8 leading-8 text-gray-800 dark:text-gray-200 text-center">
              <p>
                Have questions? Contact me at{" "}
                <a
                  href="mailto:your.email@example.com"
                  className="text-teal-600 hover:text-teal-700"
                >
                  your.email@example.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 