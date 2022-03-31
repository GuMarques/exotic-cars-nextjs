/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = nextConfig;
