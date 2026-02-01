import { Feed } from 'feed';
import { getTranslations } from 'next-intl/server';
import { tv } from 'tailwind-variants';
import { domain, websiteSettings } from '@/constants';
import { POSTS_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { FeedPost } from '@/types';

const rssFeedVariants = tv({
  slots: {
    container:
      'mx-auto min-h-screen max-w-2xl px-6 py-12 text-slate-900 transition-colors md:py-20 dark:text-slate-100',
    title: 'mb-2 font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl dark:text-white',
    titleLink: 'transition-colors hover:text-[#2563eb] dark:hover:text-[#60a5fa]',
    description: 'mb-8 text-lg text-slate-700 leading-relaxed dark:text-slate-300',
    feedInfo:
      'mb-8 flex items-center gap-2 rounded border-[#2563eb] border-l-4 bg-slate-100 p-4 dark:border-[#60a5fa] dark:bg-slate-800',
    feedInfoText: 'font-semibold text-slate-900 text-sm dark:text-white',
    feedLink: 'font-medium text-[#2563eb] transition-colors hover:underline dark:text-[#60a5fa]',
    sectionTitle: 'mb-2 font-bold text-3xl text-slate-900 tracking-tight dark:text-white',
    sectionSeparator: 'mb-8 border-slate-200 border-b pb-2 dark:border-slate-800',
    postsList: 'list-none space-y-8',
    postItem: 'border-slate-200 border-b pb-8 last:border-0 dark:border-slate-800',
    postTitle: 'mb-3 font-bold text-2xl',
    postTitleLink:
      'text-slate-900 transition-colors hover:text-[#2563eb] dark:text-white dark:hover:text-[#60a5fa]',
    postMeta: 'mb-3 font-medium text-slate-600 text-sm dark:text-slate-400',
    postExcerpt: 'mt-3 text-slate-700 leading-relaxed dark:text-slate-300',
    copyright:
      'mt-8 border-slate-200 border-t pt-8 text-center text-slate-600 text-sm dark:border-slate-800 dark:text-slate-400',
    copyrightLink: 'text-[#2563eb] transition-colors hover:underline dark:text-[#60a5fa]',
    headerContainer: 'mb-8 flex items-center justify-between',
    toggleButton:
      'inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 p-0 text-slate-600 transition duration-150 hover:-translate-y-0.5 hover:scale-105 hover:bg-slate-200 hover:text-slate-900 focus:outline-none active:translate-y-0 active:scale-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white'
  }
});

const {
  container,
  title,
  titleLink,
  description,
  feedInfo,
  feedInfoText,
  feedLink,
  sectionTitle,
  sectionSeparator,
  postsList,
  postItem,
  postTitle,
  postTitleLink,
  postMeta,
  postExcerpt,
  copyright,
  copyrightLink,
  headerContainer,
  toggleButton
} = rssFeedVariants();

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
              objects: {
                tags: post.tags
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
    const t = await getTranslations('rss');
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
  <title>${t('pageTitle', { name: websiteSettings.name })}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            background: '#ffffff',
            foreground: '#171717',
            'accent-light': '#2563eb',
            'accent-dark': '#60a5fa'
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif']
          }
        }
      },
      darkMode: 'class'
    };
    (function() {
      const THEME_STORAGE_KEY = 'theme';
      const toggleDarkLabel = ${JSON.stringify(t('toggleDarkMode'))};
      const toggleLightLabel = ${JSON.stringify(t('toggleLightMode'))};
      
      function getSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      function getStoredTheme() {
        try {
          return localStorage.getItem(THEME_STORAGE_KEY);
        } catch {
          return null;
        }
      }
      
      function setTheme(theme) {
        const isDark = theme === 'dark';
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        const lightIcon = document.getElementById('light-icon');
        const darkIcon = document.getElementById('dark-icon');
        const themeToggle = document.getElementById('theme-toggle');
        
        if (lightIcon && darkIcon) {
          lightIcon.style.display = isDark ? 'none' : 'block';
          darkIcon.style.display = isDark ? 'block' : 'none';
        }
        
        if (themeToggle) {
          themeToggle.setAttribute('aria-label', isDark ? toggleLightLabel : toggleDarkLabel);
        }
        
        try {
          if (theme === getSystemTheme()) {
            localStorage.removeItem(THEME_STORAGE_KEY);
          } else {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
          }
        } catch {}
      }
      
      function initTheme() {
        const stored = getStoredTheme();
        const theme = stored || getSystemTheme();
        setTheme(theme);
      }
      
      function toggleTheme() {
        const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      }
      
      document.addEventListener('DOMContentLoaded', function() {
        initTheme();
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeToggle.addEventListener('click', toggleTheme);
        }
        
        if (window.matchMedia) {
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!getStoredTheme()) {
              setTheme(e.matches ? 'dark' : 'light');
            }
          });
        }
      });
    })();
  </script>
  <style>
    :root {
      --background: #ffffff;
      --foreground: #171717;
    }
    .dark {
      --background: #0f172a;
      --foreground: #ededed;
    }
    html {
      background: var(--background);
      scroll-behavior: smooth;
      transition: background-color 0.3s ease;
    }
    body {
      background: var(--background);
      color: var(--foreground);
      font-family: 'Inter', sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  </style>
</head>
<body>
  <div class="${container()}">
    <div class="${headerContainer()}">
      <h1 class="${title()}"><a href="${domain}" class="${titleLink()}">${websiteSettings.name}</a></h1>
      <button id="theme-toggle" class="${toggleButton()}" type="button" aria-label="${t('toggleDarkMode')}">
        <span id="light-icon" style="display: block;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
          </svg>
        </span>
        <span id="dark-icon" style="display: none;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5"/>
            <path d="m2 2 20 20"/>
            <path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5"/>
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
          </svg>
        </span>
      </button>
    </div>
    <p class="${description()}">${t('feedPrefix')} ${websiteSettings.description}</p>
    
    <div class="${feedInfo()}">
      <strong class="${feedInfoText()}">${t('feedUrl')}</strong>
      <a href="${domain}/rss.xml" class="${feedLink()}">${domain}/rss.xml</a>
    </div>

    <h2 class="${sectionTitle()}">${t('recentPosts')}</h2>
    <div class="${sectionSeparator()}"></div>
    <ul class="${postsList()}">
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
        <li class="${postItem()}">
          <div class="${postTitle()}">
            <a href="${postUrl}" class="${postTitleLink()}">${post.title}</a>
          </div>
          <div class="${postMeta()}">
            ${date}${post.category?.title ? ` • ${post.category.title}` : ''}
          </div>
          ${briefExcerpt ? `<div class="${postExcerpt()}">${briefExcerpt}</div>` : ''}
        </li>`;
        })
        .join('')}
    </ul>
    <div class="${copyright()}">
      &copy; ${new Date().getFullYear()} ${websiteSettings.name} | <a href="${domain}" class="${copyrightLink()}">${t('backToWebsite')}</a>
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
