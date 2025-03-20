import Link from "next/link";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import SEO from "./SEO";
import PageTransition from "./PageTransition";

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

  const isActive = (path) => router.pathname === path;

  return (
    <div className={darkMode ? "dark" : ""}>
      <SEO 
        title={title}
        description={description}
        image={image}
      />

      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <nav className={`py-6 px-10 md:px-20 lg:px-40 flex justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}>
          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/') 
                    ? 'bg-teal-600 text-white hover:bg-teal-700' 
                    : 'text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/workshops" 
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/workshops') 
                    ? 'bg-teal-600 text-white hover:bg-teal-700' 
                    : 'text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                Workshops
              </Link>
            </li>
            <li>
              <Link
                href="/resume"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/resume') 
                    ? 'bg-teal-600 text-white hover:bg-teal-700' 
                    : 'text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                Resume
              </Link>
            </li>
          </ul>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <BsFillSunFill className="text-2xl" />
            ) : (
              <BsFillMoonStarsFill className="text-2xl" />
            )}
            <span className="text-sm hidden md:inline">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </nav>

        <div className="px-10 md:px-20 lg:px-40 pt-28">
          <AnimatePresence mode="wait">
            <PageTransition key={router.pathname}>
              {children}
            </PageTransition>
          </AnimatePresence>
        </div>
        
        <BackToTop />
        <Footer />
      </main>
    </div>
  );
} 