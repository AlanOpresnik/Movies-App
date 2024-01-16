/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    trailingSlash: true, 
    images: {
      unoptimized: true,
      domains: ['image.tmdb.org'],
  },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }
  
      return config;
    },
}

module.exports = nextConfig
