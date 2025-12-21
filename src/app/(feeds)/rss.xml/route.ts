import { Feed } from 'feed';
import { domain, websiteSettings } from '@/constants';
import { POSTS_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { FeedPost } from '@/types';

function createFeedItem(post: FeedPost) {
  const postUrl = `${domain}/posts/${post.slug}`;
  const imageUrl = post.image ? urlFor(post.image).width(1200).height(600).url() : undefined;

  return {
    title: post.title,
    id: postUrl,
    link: postUrl,
    description: post.excerpt || '',
    content: post.excerpt || '',
    date: new Date(post.publishedAt),
    ...(imageUrl && {
      enclosure: {
        url: imageUrl,
        type: 'image/jpeg'
      }
    }),
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
  };
}

async function generateFeed() {
  const posts = await client.fetch(POSTS_QUERY, {
    categorySlug: null,
    tagSlug: null,
    start: 0,
    end: 50
  });

  const validPosts = posts.filter(
    (post: {
      slug: string | null;
      publishedAt: string | null;
      title: string | null;
    }): post is {
      slug: string;
      publishedAt: string;
      title: string;
    } => Boolean(post.slug && post.publishedAt && post.title)
  );

  let latestPostDate = new Date();
  if (validPosts.length > 0) {
    const dates = validPosts.map((post) => new Date(post.publishedAt as string).getTime());
    latestPostDate = new Date(Math.max(...dates));
  }

  const feed = new Feed({
    title: websiteSettings.name,
    description: websiteSettings.description,
    id: domain,
    link: domain,
    language: websiteSettings.defaultLocale,
    copyright: `© ${new Date().getFullYear()}, ${websiteSettings.name}`,
    generator: domain,
    updated: latestPostDate,
    feedLinks: {
      rss: `${domain}/rss.xml`
    },
    author: {
      name: websiteSettings.name
    }
  });

  for (const post of posts) {
    if (!(post.slug && post.publishedAt && post.title)) {
      continue;
    }

    feed.addItem(
      createFeedItem({
        slug: post.slug,
        title: post.title,
        publishedAt: post.publishedAt,
        excerpt: post.excerpt || null,
        image: post.image || null,
        category:
          post.category?.title && post.category?.slug
            ? { title: post.category.title, slug: post.category.slug }
            : null,
        tags: post.tags || null
      })
    );
  }

  return feed;
}

export async function GET(request: Request) {
  const acceptHeader = request.headers.get('accept') || '';
  const isBrowser = acceptHeader.includes('text/html');

  if (isBrowser) {
    const posts = await client.fetch(POSTS_QUERY, {
      categorySlug: null,
      tagSlug: null,
      start: 0,
      end: 50
    });

    const validPosts = posts.filter(
      (post: { slug: string | null; publishedAt: string | null; title: string | null }) =>
        post.slug && post.publishedAt && post.title
    ) as Array<{
      slug: string;
      title: string;
      publishedAt: string;
      excerpt: string | null;
      category: { title: string | null } | null;
    }>;

    const html = `<!DOCTYPE html>
<html lang="${websiteSettings.defaultLocale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSS Feed - ${websiteSettings.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 2rem;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 2rem;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }
    h1 a {
      color: #2c3e50;
      text-decoration: none;
    }
    h1 a:hover {
      color: #007bff;
      text-decoration: underline;
    }
    .description {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    .feed-info {
      background: #f8f9fa;
      border-left: 4px solid #007bff;
      padding: 1rem;
      margin-bottom: 2rem;
      border-radius: 4px;
    }
    .feed-link {
      display: inline-block;
      margin-top: 0.5rem;
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
    }
    .feed-link:hover {
      text-decoration: underline;
    }
    .posts-list {
      list-style: none;
    }
    .post-item {
      padding: 1rem 0;
      border-bottom: 1px solid #e9ecef;
    }
    .post-item:last-child {
      border-bottom: none;
    }
    .post-title {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
    .post-title a {
      color: #2c3e50;
      text-decoration: none;
    }
    .post-title a:hover {
      color: #007bff;
    }
    .post-meta {
      color: #666;
      font-size: 0.9rem;
    }
    .post-excerpt {
      color: #555;
      margin-top: 0.5rem;
    }
    .copyright {
      color: #666;
      font-size: 0.9rem;
      text-align: center;
      padding: 1rem 0;
      border-top: 1px solid #e9ecef;
      margin-top: 2rem;
    }
    .copyright a {
      color: #007bff;
      text-decoration: none;
    }
    .copyright a:hover {
      text-decoration: underline;
    }
    .header-copyright {
      color: #666;
      font-size: 0.85rem;
      text-align: center;
      margin-bottom: 1rem;
    }
    .header-copyright a {
      color: #007bff;
      text-decoration: none;
    }
    .header-copyright a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1><a href="${domain}">${websiteSettings.name}</a></h1>
    <p class="description">RSS Feed: ${websiteSettings.description}</p>
    
    <div class="feed-info">
      <strong>Feed URL:</strong>
      <a href="${domain}/rss.xml" class="feed-link">${domain}/rss.xml</a>
    </div>

    <h2 style="margin-bottom: 1rem; color: #2c3e50;">Recent Posts</h2>
    <ul class="posts-list">
      ${validPosts
        .slice(0, 10)
        .map((post) => {
          const postUrl = `${domain}/posts/${post.slug}`;
          const date = new Date(post.publishedAt).toLocaleDateString(
            websiteSettings.defaultLocale,
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
          );
          let briefExcerpt = '';
          if (post.excerpt) {
            briefExcerpt =
              post.excerpt.length > 150
                ? `${post.excerpt.substring(0, 150).trim()}...`
                : post.excerpt;
          }
          return `
        <li class="post-item">
          <div class="post-title">
            <a href="${postUrl}">${post.title}</a>
          </div>
          <div class="post-meta">
            ${date}${post.category?.title ? ` • ${post.category.title}` : ''}
          </div>
          ${briefExcerpt ? `<div class="post-excerpt">${briefExcerpt}</div>` : ''}
        </li>`;
        })
        .join('')}
    </ul>
    <div class="copyright">
      &copy; ${new Date().getFullYear()} ${websiteSettings.name} | <a href="${domain}">Back to the Website</a>
    </div>
  </div>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  }

  const feed = await generateFeed();
  let rssXml = feed.rss2();
  rssXml = rssXml.replace(/(href|url|src)="([^"]*)"/g, (match, attr, url) => {
    const escaped = url.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-f]+;)/gi, '&amp;');
    return escaped !== url ? `${attr}="${escaped}"` : match;
  });

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
