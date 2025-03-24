import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { smoothScroll } from '../utils/smoothScroll';

export default function Navigation({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/workshops', label: 'Workshops' },
    { href: '/resume', label: 'Resume' }
  ];

  const handleClick = (e, href) => {
    if (href === '/') {
      smoothScroll(e, 'home');
    } else {
      router.push(href);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-10 md:px-20 lg:px-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' 
          : 'bg-white dark:bg-gray-900'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`relative text-lg transition-colors ${
                router.pathname === link.href
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400'
              }`}
            >
              {link.label}
              {router.pathname === link.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400"
                  layoutId="underline"
                />
              )}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
          {darkMode ? (
            <BsFillSunFill className="text-xl text-yellow-500" />
          ) : (
            <BsFillMoonStarsFill className="text-xl text-gray-600" />
          )}
        </button>
      </div>
    </motion.nav>
  );
} 