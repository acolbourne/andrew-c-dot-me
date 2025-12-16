import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['jsdom']
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
