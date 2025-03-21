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
      title="Michal Drajna - QA Engineer"
      description="Welcome to my portfolio website. I'm a QA Engineer specializing in test automation with Playwright."
      image="/profile.jpg"
    >
      <div className="relative">
        <section className="min-h-screen relative pt-24 md:pt-32">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 128, 128, 0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            zIndex: 0
          }} />
          <motion.div 
            className="text-center p-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
              Michal Drajna
            </h2>
            <h3 className="text-2xl py-2 dark:text-white md:text-3xl">
              QA Engineer
            </h3>
            <div className="text-md py-5 leading-8 text-gray-800 dark:text-white md:text-xl max-w-2xl mx-auto">
              <Typewriter
                options={{
                  strings: [
                    'Passionate about test automation',
                    'Playwright enthusiast',
                    'Quality-driven developer'
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </motion.div>

          <SocialIcons />

          <motion.div 
            className="relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-20 overflow-hidden md:h-96 md:w-96 shadow-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <Image src={profile} alt="Michal Drajna" layout="fill" objectFit="cover" priority />
          </motion.div>
        </section>

        <section>
          <div>
            <h3 className="text-3xl py-1 dark:text-white">Services I offer</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-white">
              As a QA Engineer, I specialize in creating robust <span className="text-teal-500">test automation frameworks</span> and implementing efficient testing strategies.
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
              ensuring top-notch quality for digital products. Check out my{" "}
              <Link href="/featured" className="text-teal-500 hover:text-teal-600">
                featured articles and interviews
              </Link>{" "}
              to learn more about my contributions to the testing community.
            </p>
          </div>
          <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap justify-center">
            {/* Portfolio items will be added here */}
          </div>
        </section>
      </div>
    </Layout>
  );
}