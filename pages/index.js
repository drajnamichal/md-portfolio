/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import profile from '../public/profile.jpg';
import playwright from '../public/playwright.png';
import pc from '../public/pc.png';
import qa from '../public/qa.png';
import article from '../public/clanok.jpg';
import skillmea from '../public/skillmea.jpg';
import advanced from '../public/advanced.jpg';
import tc1 from '../public/tc1.jpg';
import tc2 from '../public/tc2.jpg';
import tc3 from '../public/tc3.jpg';
import Typewriter from 'typewriter-effect';
import Layout from "../components/Layout";
import Link from 'next/link';
import { motion } from 'framer-motion';
import SocialIcons from '../components/SocialIcons';

export default function Home() {
  return (
    <Layout 
      title="Michal Drajna - Senior QA Engineer & Playwright Expert"
      description="Senior QA Engineer specializing in test automation with Playwright. Expert in software testing, quality assurance, and online course creator. Offering workshops and consulting services."
      image="/profile.jpg"
    >
      <section className="min-h-screen relative">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 128, 128, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          zIndex: 0
        }} />
        <motion.div 
          className="text-center p-10 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl py-2 text-teal-600 font-medium md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Michal Drajna
          </motion.h2>
          <motion.h3 
            className="text-2xl py-2 md:text-3xl lg:text-4xl dark:text-white font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Senior QA Engineer
          </motion.h3>
          <motion.div 
            className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-2xl mx-auto dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typewriter
              options={{
                strings: [
                  'Playwright Enthusiast 🎭',
                  'Online Course Creator 🎥',
                  'Conference Speaker 🎤',
                  'Test Automation Expert 🚀'
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                pauseFor: 2000,
              }}
            />
          </motion.div>
        </motion.div>

        <SocialIcons />

        <motion.div 
          className="relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-20 overflow-hidden md:h-96 md:w-96 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <Image 
            alt="Michal Drajna - Senior QA Engineer" 
            src={profile}
            layout="fill" 
            objectFit="cover"
            priority
            className="hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </section>

      <section id="services">
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
            . Check out my{" "}
            <Link href="/courses" className="text-teal-500 hover:text-teal-600">
              online courses
            </Link>{" "}
            to learn more about test automation with Playwright.
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
            <Link href="/courses" className="text-teal-500 hover:text-teal-600">
              online courses
            </Link>{" "}
            for Playwright automation and developed numerous{" "}
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
            href="https://www.browserstack.com/blog/honoring-iconsofquality-michal-drajna/"
            target="_blank"
            rel="noopener noreferrer"
            className="basis-1/3 flex-1"
          >
            <div className="relative group">
              <Image
                src="/bs-michal.png"
                alt="BrowserStack Icons of Quality Interview"
                className="rounded-lg object-cover transform transition-transform duration-300 group-hover:scale-105"
                width={400}
                height={400}
                layout="responsive"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </a>
          <a
            href="https://skillmea.sk/blog_posts/playwright-vs-selenium-vs-cypress"
            target="_blank"
            rel="noopener noreferrer"
            className="basis-1/3 flex-1"
          >
            <div className="relative group">
              <Image
                src={article}
                alt="Playwright/Selenium/Cypress article"
                className="rounded-lg object-cover transform transition-transform duration-300 group-hover:scale-105"
                width={400}
                height={400}
                layout="responsive"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl py-1 dark:text-white">
              TestCrunch 2024 conference
            </h2>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-white">
              I delivered a presentation titled "Playwright: The Future of Test Automation?" at the biggest SK/CZ TestCrunch conference,
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
    </Layout>
  );
}