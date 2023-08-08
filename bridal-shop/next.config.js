/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.kleinfeldbridal.com',
        port: '',
      }
    ],
  }
}

module.exports = nextConfig
