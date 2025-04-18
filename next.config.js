/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;