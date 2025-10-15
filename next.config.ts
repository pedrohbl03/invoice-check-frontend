import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
  },
  images: {
    domains: ['pub-ea2a538675a9407d90b18029b42bb9f2.r2.dev', 'images.unsplash.com'],
  },
};

export default nextConfig;
