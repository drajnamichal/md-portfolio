/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      'www.browserstack.com',
      'skillmea.sk',
      'i.ytimg.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    unoptimized: true, // Required for static export
  },
  // Enable static optimization
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
  // Configure static export
  output: 'export',
  // Security configurations
  poweredByHeader: false, // Remove X-Powered-By header
};

module.exports = nextConfig;
