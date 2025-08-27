/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  trailingSlash: true,
  generateBuildId: async () => {
    // Force new build ID to invalidate cache
    return `build-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },
  // Force CSS regeneration
  experimental: {
    forceSwcTransforms: true,
  },
  // Disable CSS optimization that might cache styles
  optimizeFonts: false,
  // Simplified webpack config to avoid build errors
  webpack: (config, { dev }) => {
    // Only set alias - remove problematic splitChunks config
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
