import Link from "next/link";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
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

  // Initialize dark mode from localStorage and system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync dark mode changes with localStorage and document class
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 z-50">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full shadow-lg px-6 py-3">
          <ul className="flex items-center space-x-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/consultations', label: 'Consultations' },
              { href: '/workshops', label: 'Workshops' },
              { href: '/courses', label: 'Courses' },
              { href: '/featured', label: 'Featured' },
              { href: '/resume', label: 'Resume' }
            ].map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`group px-3 py-1 rounded-full text-sm transition-all duration-300 ${
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
        </div>
      </nav>

      <div className="fixed top-4 right-4 z-50">
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {darkMode ? (
            <BsFillSunFill className="text-xl" />
          ) : (
            <BsFillMoonStarsFill className="text-xl" />
          )}
        </motion.button>
      </div>

      <main className="px-5 md:px-20 lg:px-40 pb-24">
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