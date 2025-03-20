/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import playwright from '../public/playwright.png';
import WorkshopStats from "../components/WorkshopStats";
import Layout from "../components/Layout";

export default function Workshops() {
  const [darkMode, setDarkMode] = useState(false);
  
  const workshopStats = {
    participantCount: '10+',
    satisfactionRate: '4.9/5',
    workshopsDelivered: '1',
    companiesServed: '1',
    testimonialHighlight: {
      text: "Michal's workshop was incredibly practical and helped our team transition to Playwright smoothly. His expertise and teaching style made complex concepts easy to understand.",
      author: "Workshop Participant"
    }
  };

  return (
    <Layout title="Playwright Workshops - Michal Drajna">
      <div className="text-center mb-16">
        <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
          Playwright Automation Workshops for Teams 🚀
        </h2>
        <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
          Master End-to-End Testing with Playwright
        </h3>
      </div>
      
      <div className="max-w-2xl mx-auto mb-16">
        <p className="text-md py-5 leading-8 text-gray-800 md:text-xl dark:text-gray-200">
          Struggling with flaky tests, slow execution, or unreliable automation? My hands-on Playwright workshops are designed to help your team write faster, more stable, and maintainable tests.
        </p>
      </div>

      <div className="flex justify-center mb-16">
        <Image src={playwright} width={200} height={200} className="rounded-xl" />
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <WorkshopStats stats={workshopStats} />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-16">
          <h3 className="text-3xl py-1 mb-8 dark:text-white text-center">What Your Team Will Learn</h3>
          <div className="text-md leading-8 text-gray-800 dark:text-gray-200">
            <ul className="space-y-4 ml-8">
              <li>✅ How to eliminate flaky tests and improve test reliability</li>
              <li>✅ Best practices for waiting strategies and selectors</li>
              <li>✅ Debugging techniques with trace files and Playwright Inspector</li>
              <li>✅ Optimizing tests for parallel execution and CI/CD pipelines</li>
              <li>✅ Advanced topics like API testing, visual testing, and accessibility</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl py-1 mb-8 dark:text-white text-center">Why Choose This Workshop?</h3>
          <div className="text-md leading-8 text-gray-800 dark:text-gray-200">
            <ul className="space-y-4 ml-8">
              <li>🔹 Tailored for your team – real-world challenges, practical solutions</li>
              <li>🔹 Hands-on learning – interactive exercises, best practices, and live debugging</li>
              <li>🔹 Led by an experienced QA Engineer – 9+ years in automation, Playwright course creator</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl py-1 mb-8 dark:text-white text-center">Who Is This For?</h3>
          <div className="text-md leading-8 text-gray-800 dark:text-gray-200">
            <ul className="space-y-4 ml-8">
              <li>📌 QA Engineers & Testers looking to improve their automation skills</li>
              <li>📌 Developers who want to integrate better testing into their workflow</li>
              <li>📌 Teams transitioning to Playwright from other frameworks</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-sm text-yellow-700">
              Please note: The registration form and workshop are available in Slovak and Czech languages only.
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl mb-8 dark:text-white">Ready to take your test automation to the next level? Let's talk! 🚀</p>
            <a
              href="https://forms.gle/n8fXKZ7ZCGEyWrMbA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors inline-block"
            >
              Register Your Interest
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-md leading-8 text-gray-800 dark:text-gray-200">
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
    </Layout>
  );
} 