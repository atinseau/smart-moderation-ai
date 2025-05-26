import * as dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import type { NextConfig } from "next";

const env = dotenv.config({
  path: require.resolve('@smart-moderation-ai/db/env')
})

dotenvExpand.expand(env)

const nextConfig: NextConfig = {
  transpilePackages: [
    '@elysiajs/eden'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com'
      }
    ]
  }
};

export default nextConfig;
