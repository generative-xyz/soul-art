const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.generative.xyz',
      },
      {
        protocol: 'https',
        hostname: '**.souldao.art',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "@Styles/_tools.scss";@import "@Styles/_setting.scss";@import '~bootstrap/scss/mixins';`,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/souls',
        permanent: true,
      },
      {
        source: '/404',
        destination: '/souls/404',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
