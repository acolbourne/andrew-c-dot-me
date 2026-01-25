import type { MetadataRoute } from 'next';
import { domain } from '@/constants';

export default function Robots(): MetadataRoute.Robots {
  return {
    sitemap: `${domain}/sitemap.xml`,
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/'
    }
  };
}
