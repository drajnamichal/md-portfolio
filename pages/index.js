/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import profile from '../public/profile.jpg';
import Typewriter from 'typewriter-effect';
import Layout from "../components/Layout";
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
                    'Passionate about test automation 🎭',
                    'Playwright enthusiast 🚀',
                    'Quality-driven developer 💻'
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
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <Image src={profile} alt="Michal Drajna" layout="fill" objectFit="cover" priority />
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}