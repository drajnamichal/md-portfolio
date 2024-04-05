/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {AiFillFacebook, AiFillLinkedin, AiFillGithub, AiFillMail} from 'react-icons/ai';
import Image from 'next/image';
import memoji from '../public/memoji.png';
// import memoji2 from '../public/memoji2.jpg';
import playwright from '../public/playwright.png';
import pc from '../public/pc.png';
import qa from '../public/qa.png';
import article from '../public/clanok.jpg';
import skillmea from '../public/skillmea.jpg';
import advanced from '../public/advanced.jpg';
import tc1 from '../public/tc1.jpg';
import tc2 from '../public/tc2.jpg';
import tc3 from '../public/tc3.jpg';
import { useState } from "react";
import Typewriter from 'typewriter-effect';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Michal Drajna - Portfolio</title>
        <meta name="description" content="Michal Drajna" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="text-xl font-burtons dark:text-white">
              <Typewriter
                options={{
                  strings: ["developedbymichal"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl dark:text-white"
                />
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8"
                  download
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-center p-10">
            <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
              Michal Drajna
            </h2>
            <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
              Senior QA Engineer
            </h3>
            <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white">
              Playwright Enthusiast 🎭 Online Course Creator 🎥 Conference speaker 🎤 
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-white">
            <a
              className="hover:scale-110"
              href="https://www.facebook.com/michaldrajna/"
            >
              <AiFillFacebook />
            </a>
            <a
              className="hover:scale-110"
              href="https://www.linkedin.com/in/michaldrajna-qa/"
            >
              <AiFillLinkedin />
            </a>
            <a
              className="hover:scale-110"
              href="https://github.com/drajnamichal"
            >
              <AiFillGithub />
            </a>
            <a
              className="hover:scale-110"
              href="mailto:michal.drajna@gmail.com"
            >
              <AiFillMail />
            </a>
          </div>
          <div className="relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-20 overflow-hidden md:h-96 md:w-96">
            <Image alt="emoji" src={memoji} layout="fill" objectFit="cover" />
          </div>
        </section>

        <section>
          <div className="text-center py-8">
            <h3 className="text-3xl py-1 dark:text-white">Services I offer</h3>
            <p className="text-md py-5 leading-8 text-gray-800 dark:text-white text-center max-w-2xl mx-auto w-full">
              I provide a comprehensive range of services tailored to meet the
              diverse needs of my clients. From ensuring seamless software
              performance to delivering top-notch user experiences, my expertise
              covers <span className="text-teal-500">automation testing</span>,
              allowing businesses to enhance efficiency and accuracy while
              reducing testing time. As a seasoned manual tester, I meticulously
              scrutinize applications to identify even the slightest flaws,
              guaranteeing the delivery of high-quality products. My commitment
              to overall quality assurance ensures that each aspect of the
              development process adheres to the highest standards. Furthermore,
              I offer specialized training as a{" "}
              <span className="text-teal-500">Playwright lecturer</span>,
              equipping individuals with the knowledge and skills to excel in{" "}
              <span className="text-teal-500">
                modern testing methodologies
              </span>
              . As an online teacher for testing, I am dedicated to empowering
              students worldwide by providing accessible and insightful learning
              experiences in the realm of software testing. I am an expert in
              all phases of the software testing life cycle, from the initial
              requirements testing to the final e2e testing.
            </p>
            <p className="text-md py-5 leading-8 text-gray-800 dark:text-white text-center max-w-2xl mx-auto w-full">
              With a passion for excellence and a wealth of industry knowledge,
              I am dedicated to helping businesses thrive through exceptional
              testing practices.
            </p>
          </div>
          <div className="lg:flex gap-10">
            <div className="text-center shadow-lg p-10 rounded-xl my-10  dark:bg-teal-500 flex-1 hover:scale-105">
              <div className="mx-auto">
                <Image
                  className="mx-auto"
                  src={playwright}
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-lg font-bold pt-8 pb-2  ">
                Consulting and Training
              </h3>
              <p className="py-2">
                Empower your team with expert test automation consulting and
                training. Craft a tailored automation strategy, integrate CI/CD
                pipelines, and master tools like Playwright and Selenium.
                Elevate your testing to deliver high-quality products faster.
              </p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-teal-500 flex-1 hover:scale-105">
              <Image className="mx-auto" src={pc} width={100} height={100} />
              <h3 className="text-lg font-bold pt-8 pb-2 ">
                Framework Development
              </h3>
              <p className="py-2">
                Unlock test automation's potential with a custom-built
                framework. Modular and maintainable, it seamlessly integrates
                into your workflow, maximizing efficiency throughout the
                development process.
              </p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-teal-500 flex-1 hover:scale-105">
              <Image className="mx-auto" src={qa} width={100} height={100} />
              <h3 className="text-lg font-bold pt-8 pb-2 ">
                Remote QA Services
              </h3>
              <p className="py-2">
                Outsource QA testing to a seasoned professional. Rigorous
                testing across browsers and devices, detailed bug reports, and
                expert exploratory testing for a flawless user experience.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center">
            <h3 className="text-3xl py-1 dark:text-white">Portfolio</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-white text-center max-w-2xl mx-auto w-full">
              As a QA Engineer, I have created{" "}
              <span className="text-teal-500">online course</span> for
              Playwright automation and developed numerous{" "}
              <span className="text-teal-500">automation frameworks</span> from
              scratch, contributing to the success of various projects and
              ensuring top-notch quality for digital products. I have also
              contributed to the industry through writing a few{" "}
              <span className="text-teal-500">articles</span> on testing and QA,
              sharing my knowledge and expertise with the community.
            </p>
          </div>
          <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap justify-center">
            <a
              href="https://skillmea.sk/online-kurzy/test-automatizacia-playwright"
              target="_blank"
            >
              <div className="basis-1/3 flex-1">
                <Image
                  src={skillmea}
                  alt="Online Playwright course"
                  className="rounded-lg object-cover"
                  width={400}
                  height={400}
                  layout="responsive"
                />
              </div>
            </a>
            <a
              href="https://skillmea.sk/online-kurzy/playwright-pre-pokrocilych"
              target="_blank"
            >
              <div className="basis-1/3 flex-1">
                <Image
                  src={advanced}
                  alt="Online Playwright course"
                  className="rounded-lg object-cover"
                  width={400}
                  height={400}
                  layout="responsive"
                />
              </div>
            </a>
            <a
              href="https://skillmea.sk/blog_posts/playwright-vs-selenium-vs-cypress"
              target="_blank"
            >
              <div className="basis-1/3 flex-1">
                <Image
                  src={article}
                  alt="Playwright/Selenium/Cypress article"
                  className="rounded-lg object-cover"
                  width={400}
                  height={400}
                  layout="responsive"
                />
              </div>
            </a>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl py-1 dark:text-white">
                TestCrunch 2024 Conference
              </h2>
              <p className="text-md py-2 leading-8 text-gray-800 dark:text-white">
                I delivered a presentation titled "Playwright: The Future of Test Automation?" at the prestigious TestCrunch conference,
                attracting an audience of nearly 500 professionals eager to explore the latest advancements in the QA field. During my speech, I provided a brief overview of Playwright, its history,
                future and the modern features it offers. I also showed the attendees the different kinds of testing they can do in Playwright and finally I compared it to its biggest competitor,
                Cypress. The presentation not only captivated the audience but also sparked meaningful discussions, evidenced by the multitude of questions and positive feedback received post-event.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden">
                <Image src={tc1} alt="testcrunch2024" className="w-full h-56 object-cover object-center transform hover:scale-110" />
              </div>
              <div className="hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden">
                <Image src={tc2} alt="testcrunch2024" className="w-full h-56 object-cover object-center transform hover:scale-110" />
              </div>
              <div className="hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden">
                <Image src={tc3} alt="testcrunch2024" className="w-full h-56 object-cover object-center transform hover:scale-110" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center">
          <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
            <div className="lg:col-span-2 flex justify-between mt-6">
              <div>
                <h6 className="font-medium text-gray-400">
                  Copyright © 2024 Michal Drajna
                </h6>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}