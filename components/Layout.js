import Link from "next/link";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import SEO from "./SEO";
import PageTransition from "./PageTransition";
import Head from "next/head";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function Layout({ children, title, description, image }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  const isActive = (path) => router.pathname === path;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          #nprogress .bar {
            background: #0d9488 !important;
            height: 3px !important;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px #0d9488, 0 0 5px #0d9488 !important;
          }
          #nprogress .spinner-icon {
            border-top-color: #0d9488 !important;
            border-left-color: #0d9488 !important;
          }
        `}</style>
      </Head>

      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 transition-all duration-300">
        <div className={`py-6 px-10 md:px-20 lg:px-40 flex justify-between ${
          isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}>
          <ul className="flex items-center space-x-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/workshops', label: 'Workshops' },
              { href: '/courses', label: 'Courses' },
              { href: '/featured', label: 'Featured' },
              { href: '/resume', label: 'Resume' }
            ].map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`group px-4 py-2 rounded-md transition-all duration-300 relative ${
                    isActive(item.href) 
                      ? 'bg-teal-600 text-white hover:bg-teal-700' 
                      : 'text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400'
                  }`}
                >
                  {item.label}
                  {!isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? (
              <BsFillSunFill className="text-2xl" />
            ) : (
              <BsFillMoonStarsFill className="text-2xl" />
            )}
            <span className="text-sm hidden md:inline">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </motion.button>
        </div>
      </nav>

      <main className="px-5 md:px-20 lg:px-40">
        <AnimatePresence mode="wait">
          <PageTransition key={router.pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </main>

      <footer className="py-10 mt-12 bg-gray-100 dark:bg-gray-800">
        <Footer />
      </footer>
    </div>
  );
} 