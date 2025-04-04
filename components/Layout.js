import Link from "next/link";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import Head from "next/head";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import VisitorTracker from './VisitorTracker';
import Header from './Header';

export default function Layout({ children, title, description, image }) {
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

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <VisitorTracker />
      <Head>
        <title>Michal Drajna</title>
        <meta name="description" content={description || "Michal Drajna's personal website and blog"} />
        <meta property="og:title" content="Michal Drajna" />
        <meta property="og:description" content={description || "Michal Drajna's personal website and blog"} />
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

      <Header />
      <main className="flex-grow px-5 md:px-20 lg:px-40 pt-24">
        <AnimatePresence mode="wait">
          <PageTransition key={router.pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </main>

      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Footer />
        </div>
      </footer>
    </div>
  );
} 