import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'd2ms8rpfqc4h24.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'www.milesweb.com',
      },
      {
        protocol: 'https',
        hostname: 'www.patterns.dev',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
