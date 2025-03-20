import { useState } from 'react';
import Head from 'next/head';
import Navigation from './Navigation';
import BackToTop from './BackToTop';
import Footer from './Footer';

export default function Layout({ children, title = 'Michal Drajna' }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Michal Drajna's Portfolio - Senior QA Engineer specializing in test automation with Playwright" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Senior QA Engineer specializing in test automation with Playwright" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="pt-24 px-10 md:px-20 lg:px-40">
          {children}
        </main>
        <BackToTop />
        <Footer />
      </div>
    </div>
  );
} 