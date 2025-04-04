import Link from "next/link";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => router.pathname === path;

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/consultations', label: 'Consultations' },
    { href: '/workshops', label: 'Workshops' },
    { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' },
    { href: '/featured', label: 'Featured' },
    { href: '/resume', label: 'Resume' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 transition-all duration-300 h-20">
      <div className={`h-full py-0 px-10 md:px-20 lg:px-40 flex justify-between items-center ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}>
        <ul className="flex items-center space-x-2">
          {navigationItems.map((item) => (
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
  );
} 