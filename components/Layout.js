import Link from "next/link";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";
import Typewriter from 'typewriter-effect';
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import SEO from "./SEO";

export default function Layout({ children, title, description, image }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <SEO 
        title={title}
        description={description}
        image={image}
      />

      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <nav className="py-10 mb-12 flex justify-between sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
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
          <ul className="flex items-center">
            <li>
              <Link href="/workshops" className="bg-teal-600 text-white px-4 py-2 rounded-md ml-8 hover:bg-teal-700">
                Workshops
              </Link>
            </li>
            <li>
              <Link
                href="/resume"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8 hover:from-cyan-600 hover:to-teal-600"
              >
                Resume
              </Link>
            </li>
            <li>
              <BsFillMoonStarsFill
                onClick={() => setDarkMode(!darkMode)}
                className="cursor-pointer text-2xl dark:text-white ml-8"
              />
            </li>
          </ul>
        </nav>

        {children}
        
        <BackToTop />
        <Footer />
      </main>
    </div>
  );
} 