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
      },
      {
        protocol: 'https',
        hostname: 'www.libertyinlove.co.uk',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
      },
    ],
  }
}

module.exports = nextConfig
