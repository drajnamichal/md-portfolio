import Head from "next/head";
import Link from "next/link";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";
import Recommendations from "../components/Recommendations";

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
              <div className="mt-4 text-gray-600 dark:text-gray-400">
                <p>Brno, Czech Republic</p>
                <p>+421 905 962 717</p>
                <p>michal.drajna@gmail.com</p>
              </div>
            </div>

            <div className="mb-8 flex justify-center">
              <a
                href="/Michal Drajna -- zivotopis.pdf"
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
                  I am a Senior QA Engineer with 9 years of experience in the QA industry. I have expertise in all phases of 
                  the software testing lifecycle, from requirements testing to regression testing, and understand the importance 
                  of shift-left testing. My extensive experience spans web, API, and mobile testing. Currently, I am focused on 
                  expanding my skills in security and performance testing to further improve software quality. As a dedicated learner, 
                  I stay up-to-date with the latest testing techniques and advancements in the field. Additionally, I am a Playwright 
                  enthusiast with a strong interest in challenging projects and opportunities for professional growth.
                </p>
              </section>

              {/* Experience Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Work Experience</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-medium">QA Engineer</h4>
                    <p className="text-gray-600 dark:text-gray-400">Investown • 10/2022 - Present • Prague</p>
                    <ul className="list-disc ml-6 mt-2 space-y-2">
                      <li>Designed, developed, and maintain a comprehensive test framework in the fastest-growing fintech startup in the Czech Republic</li>
                      <li>Implemented end-to-end regression and visual tests for both web and mobile applications using Playwright and TypeScript</li>
                      <li>Test Android and iOS apps using Detox</li>
                      <li>Contribute to the CI/CD pipeline to ensure thorough testing of new code changes before release</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium">Senior QA Engineer</h4>
                    <p className="text-gray-600 dark:text-gray-400">Currys CoE, s.r.o. • 09/2021 - 03/2024 • Brno</p>
                    <ul className="list-disc ml-6 mt-2 space-y-2">
                      <li>Contributed to application development for Currys stores, ensuring smooth customer interactions via iPads</li>
                      <li>Utilized Postman for API testing and CodeceptJS for end-to-end testing</li>
                      <li>Used tools including BrowserStack, Bamboo, Jenkins, Bitbucket, Jira, Zephyr</li>
                      <li>Implemented k6 for performance testing and visual testing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium">Test Engineer</h4>
                    <p className="text-gray-600 dark:text-gray-400">GlobalLogic Slovakia • 11/2017 - 06/2019 • Košice</p>
                    <ul className="list-disc ml-6 mt-2 space-y-2">
                      <li>Conducted web application testing for wearable defibrillator project using Selenium and Python</li>
                      <li>Worked on secure document sharing project ensuring safe document sharing across platforms</li>
                      <li>Utilized tools including Pytest, Git, Jira, Zephyr, Confluence, and Appium</li>
                      <li>Performed UI/UX testing, manual testing, and bug reporting</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium">Test Automation Developer</h4>
                    <p className="text-gray-600 dark:text-gray-400">FPT Slovakia • 08/2015 - 10/2017 • Košice</p>
                    <ul className="list-disc ml-6 mt-2 space-y-2">
                      <li>Designed and developed automated tests for REST Web services using CA DevTest (LISA)</li>
                      <li>Worked with tools including Spira, Jira, TortoiseSVN, XML, and JSON</li>
                      <li>Served as manual tester using Mantis and Polarion</li>
                      <li>Member of internal security testing team focusing on web application security using Burp Suite, Webscarab, and OWASP ZAP</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Skills Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Technical Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Core Skills</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Test Automation</li>
                      <li>Manual Testing</li>
                      <li>Mobile Testing</li>
                      <li>API Testing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technologies</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Playwright</li>
                      <li>Selenium</li>
                      <li>Cypress</li>
                      <li>CodeceptJS</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Additional Skills</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>CI/CD</li>
                      <li>Performance Testing</li>
                      <li>Security Testing</li>
                      <li>Test Management</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Education</h3>
                <div>
                  <h4 className="text-xl font-medium">Master&apos;s Degree in Business Informatics</h4>
                  <p className="text-gray-600 dark:text-gray-400">Technical University of Košice • 2009 - 2014</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Focus on analysis and design of information systems based on business processes, including enterprise information systems,
                    IT services management, and modern systems for management support and decision-making.
                  </p>
                </div>
              </section>

              {/* Languages Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Languages</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>English - Professional</li>
                  <li>German - Elementary</li>
                  <li>Slovak - Native</li>
                </ul>
              </section>

              {/* Certifications & Achievements Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Certifications & Achievements</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>ISTQB Certified Tester - Foundation Level</li>
                  <li>Speaker at TestCrunch 2024 - &ldquo;Playwright: The Future of Test Automation?&rdquo;</li>
                  <li>Creator of two online courses on Skillmea portal:
                    <ul className="list-disc ml-6 mt-2">
                      <li>&ldquo;Test Automation in Playwright&rdquo; - Introduction to testing in Playwright</li>
                      <li>&ldquo;Advanced Playwright&rdquo; - Advanced testing techniques</li>
                    </ul>
                  </li>
                </ul>
              </section>

              {/* Other Projects Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Other Projects</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Osobnyudaj.sk • 07/2021 - 12/2021</h4>
                    <p>Streamlined testing for web application using CodeceptJS + Playwright automation framework</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Butikovo.sk • 03/2021 - 05/2021</h4>
                    <p>Implemented Cypress smoke tests in continuous deployment pipeline</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Spusti.to • 11/2020 - 02/2021</h4>
                    <p>Automation and manual testing for revolutionary form of accounting in Slovakia</p>
                  </div>
                </div>
              </section>

              {/* Interests Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Interests</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Exploring distant lands</li>
                  <li>Every kind of sport</li>
                  <li>Getting lost in a good book</li>
                  <li>Feeling the music</li>
                </ul>
              </section>

              {/* Recommendations Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400 text-center">Recommendations</h3>
                <Recommendations />
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 