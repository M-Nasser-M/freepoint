import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.freepoint-eg.com',
        protocol: 'https',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  redirects,
}

const withPayloadNext = withPayload(nextConfig, { devBundleServerPackages: false })

export default withPayloadNext
