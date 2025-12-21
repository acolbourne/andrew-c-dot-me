import type { MetadataRoute } from 'next';
import { domain } from '@/constants';

export default function Sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${domain}/contact-me`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${domain}/archive`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    },
    {
      url: `${domain}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    },
    {
      url: `${domain}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    }
  ];
}
