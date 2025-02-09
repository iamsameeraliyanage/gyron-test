import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL as 'http' | 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || '',
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATHNAME,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
