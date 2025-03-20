import Head from "next/head";
import Link from "next/link";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";

export default function Resume() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Resume - Michal Drajna</title>
        <meta name="description" content="Michal Drajna's Resume" />
      </Head>

      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <Link href="/" className="text-xl font-burtons dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <ul className="flex items-center">
              <li>
                <Link href="/workshops" className="bg-teal-600 text-white px-4 py-2 rounded-md ml-8 hover:bg-teal-700">
                  Workshops
                </Link>
              </li>
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl dark:text-white ml-8"
                />
              </li>
            </ul>
          </nav>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-5xl py-2 text-teal-600 font-medium">Michal Drajna</h1>
              <h2 className="text-2xl py-2 dark:text-white">Senior QA Engineer</h2>
            </div>

            <div className="mb-8 flex justify-center">
              <a
                href="/resume.pdf"
                className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors flex items-center"
                download
              >
                Download Resume (PDF)
              </a>
            </div>

            <div className="space-y-12 text-gray-800 dark:text-gray-200">
              {/* Summary Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Professional Summary</h3>
                <p className="leading-7">
                  Senior QA Engineer with 9+ years of experience in test automation and quality assurance. 
                  Specialized in Playwright automation, course creation, and conference speaking. 
                  Passionate about sharing knowledge and improving testing practices across the industry.
                </p>
              </section>

              {/* Experience Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Work Experience</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-medium">Senior QA Engineer</h4>
                    <p className="text-gray-600 dark:text-gray-400">Company Name • 2020 - Present</p>
                    <ul className="list-disc ml-6 mt-2 space-y-2">
                      <li>Led end-to-end test automation initiatives using Playwright</li>
                      <li>Created and delivered online courses on test automation</li>
                      <li>Spoke at TestCrunch 2024 conference about Playwright automation</li>
                      <li>Developed and maintained automated test frameworks</li>
                    </ul>
                  </div>
                  {/* Add more experience entries as needed */}
                </div>
              </section>

              {/* Skills Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Technical Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Automation</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Playwright</li>
                      <li>Selenium</li>
                      <li>Cypress</li>
                      <li>JavaScript/TypeScript</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Testing</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>E2E Testing</li>
                      <li>API Testing</li>
                      <li>Performance Testing</li>
                      <li>Visual Testing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tools</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Git</li>
                      <li>CI/CD</li>
                      <li>JIRA</li>
                      <li>TestRail</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Education</h3>
                <div>
                  <h4 className="text-xl font-medium">Your University Degree</h4>
                  <p className="text-gray-600 dark:text-gray-400">University Name • Graduation Year</p>
                </div>
              </section>

              {/* Certifications Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Certifications</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Add your relevant certifications here</li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 