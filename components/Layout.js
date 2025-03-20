import Link from "next/link";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import Typewriter from 'typewriter-effect';
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import SEO from "./SEO";

export default function Layout({ children, title, description, image }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <h1 className="text-xl font-burtons dark:text-white">
            <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              <Typewriter
                options={{
                  strings: ["developedbymichal"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Link>
          </h1>
          <ul className="flex items-center space-x-8">
            <li>
              <Link href="/workshops" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                Workshops
              </Link>
            </li>
            <li>
              <Link
                href="/resume"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-teal-600 transition-colors"
              >
                Resume
              </Link>
            </li>
            <li>
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
            </li>
          </ul>
        </nav>

        <div className="px-10 md:px-20 lg:px-40 pt-28">
          {children}
        </div>
        
        <BackToTop />
        <Footer />
      </main>
    </div>
  );
} 