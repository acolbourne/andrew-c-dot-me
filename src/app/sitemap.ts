import type { MetadataRoute } from 'next';
import { domain } from '@/constants';
import { PAGE_SLUGS_QUERY, POST_SLUGS_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import type { PostSlugs } from '@/types';

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages] = await Promise.all([
    client.fetch<PostSlugs[]>(POST_SLUGS_QUERY),
    client.fetch<Array<{ slug: string }>>(PAGE_SLUGS_QUERY)
  ]);

  const staticPages: MetadataRoute.Sitemap = [
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

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${domain}/posts/${post.slug}`,
    lastModified: new Date(post.publishedAt ?? new Date().toISOString()),
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  const generatedPages: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${domain}/page/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...staticPages, ...blogPosts, ...generatedPages];
}
