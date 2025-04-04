import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import Toast from '../components/Toast';
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import SEO from '../next-seo.config';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait" initial={false}>
        <main id="main-content">
          <Component {...pageProps} key={router.pathname} showToast={showToast} />
        </main>
      </AnimatePresence>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      <Analytics />
    </>
  );
}
