import { Feed } from 'feed';
import { domain, websiteSettings } from '@/constants';
import { POSTS_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export async function GET() {
  const feed = new Feed({
    title: websiteSettings.name,
    description: websiteSettings.description,
    id: domain,
    link: domain,
    language: websiteSettings.defaultLocale,
    copyright: `© ${new Date().getFullYear()}, ${websiteSettings.name}`,
    generator: domain,
    feedLinks: {
      rss: `${domain}/rss.xml`
    },
    author: {
      name: websiteSettings.name
    }
  });

  const posts = await client.fetch(POSTS_QUERY, {
    categorySlug: null,
    tagSlug: null,
    start: 0,
    end: 50
  });

  for (const post of posts) {
    if (!(post.slug && post.publishedAt && post.title)) {
      continue;
    }

    const postUrl = `${domain}/posts/${post.slug}`;
    const imageUrl = post.image ? urlFor(post.image).width(1200).height(600).url() : undefined;

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt || '',
      content: post.excerpt || '',
      date: new Date(post.publishedAt),
      image: imageUrl,
      author: [
        {
          name: websiteSettings.name
        }
      ],
      category:
        post.category?.title && post.category?.slug
          ? [
              {
                name: post.category.title,
                term: post.category.slug
              }
            ]
          : [],
      ...(post.tags && post.tags.length > 0
        ? {
            extensions: [
              {
                name: '_tags',
                objects: post.tags
                  .filter(
                    (tag: {
                      title: string | null;
                      slug: string | null;
                    }): tag is {
                      title: string;
                      slug: string;
                    } => Boolean(tag.title && tag.slug)
                  )
                  .map((tag) => ({
                    name: tag.title,
                    term: tag.slug
                  }))
              }
            ]
          }
        : {})
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
