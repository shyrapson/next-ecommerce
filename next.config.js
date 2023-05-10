/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.ibb.co',
      'www.pngarts.com',
      'images.ctfassets.net',
      'st2.depositphotos.com',
    ],
  },
};

module.exports = nextConfig;
