/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import profile from '../public/profile.jpg';
import Typewriter from 'typewriter-effect';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import SocialIcons from '../components/SocialIcons';
import { FaPlay, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

// This enables Static Site Generation (SSG)
export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function Home() {
  const router = useRouter();

  const handleCourseRedirect = () => {
    router.push('/courses');
  };

  return (
    <Layout
      title="Michal Drajna - QA Engineer"
      description="Welcome to my portfolio website. I'm a QA Engineer specializing in test automation with Playwright."
      image="/profile.jpg"
    >
      <div className="relative">
        <section className="min-h-screen relative pt-24 md:pt-32">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(0, 128, 128, 0.1) 1px, transparent 0)',
              backgroundSize: '40px 40px',
              zIndex: 0,
            }}
          />
          <motion.div
            className="text-center p-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">Michal Drajna</h2>
            <h3 className="text-2xl py-2 dark:text-white md:text-3xl">QA Engineer</h3>
            <div className="text-md py-5 leading-8 text-gray-800 dark:text-white md:text-xl max-w-2xl mx-auto">
              <Typewriter
                options={{
                  strings: ['Conference speaker', 'Playwright enthusiast', 'Online course creator'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </motion.div>

          <SocialIcons />

          <motion.div
            className="relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-20 mb-32 overflow-hidden md:h-96 md:w-96 shadow-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Image
              src={profile}
              alt="Michal Drajna - QA Engineer"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 768px) 320px, 384px"
              className="object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </section>

        {/* Course Promotion Section */}
        <section className="py-16 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                🎭 New Course Available!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Master the future of test automation with AI-powered tools and intelligent agents
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src="/playwright.png"
                      alt="Playwright MCP & Agents Course"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                      $99
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                    Playwright MCP & Agents
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Master Playwright with Model Context Protocol (MCP) and AI Agents. Learn how to
                    build intelligent test automation using AI-powered tools, agents, and modern
                    testing techniques.
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                      What you'll learn:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Introduction to Model Context Protocol',
                        'Building MCP servers for testing',
                        'AI Agents for test automation',
                        'AI-powered test generation',
                        'Advanced Playwright automation',
                        'Integration with CI/CD pipelines',
                      ].map((topic, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                        >
                          <FaCheck className="text-teal-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleCourseRedirect}
                      className="flex items-center justify-center bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaPlay className="mr-2" />
                      View Course Details
                    </button>
                    <button
                      onClick={handleCourseRedirect}
                      className="flex items-center justify-center border-2 border-teal-600 text-teal-600 dark:text-teal-400 px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300"
                    >
                      Enroll Now
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
