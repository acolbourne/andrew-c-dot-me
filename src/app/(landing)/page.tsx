import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import BlogPostListing from '@/components/BlogPostListing';
import HeroSection from '@/components/HeroSection/page';
import Pagination from '@/components/Pagination';
import { POSTS_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import type { PostListing } from '@/types';

const Homepage = async () => {
  const t = await getTranslations('homepage');
  const posts = await client.fetch(POSTS_QUERY, {
    categorySlug: null,
    tagSlug: null,
    start: 0,
    end: 5
  });

  return (
    <>
      <HeroSection />

      <section>
        <div className="mb-8 flex items-end justify-between border-slate-200 border-b pb-2 dark:border-slate-800">
          <h2 className="font-bold text-slate-600 text-sm uppercase tracking-wider dark:text-slate-400">
            {t('latestArticles')}
          </h2>
          <Link
            className="font-medium text-accent-light text-xs hover:underline dark:text-accent-dark"
            href="/archive"
          >
            {t('viewArchive')}
          </Link>
        </div>

        <div className="space-y-20">
          {!!posts && posts.length > 0
            ? posts.map((post: PostListing) => (
                <BlogPostListing
                  category={post.category}
                  excerpt={post.excerpt}
                  image={post.image}
                  key={post._id}
                  publishedAt={post.publishedAt}
                  slug={post.slug}
                  tags={post.tags}
                  title={post.title}
                />
              ))
            : null}
        </div>

        <Pagination />
      </section>
    </>
  );
};

export default Homepage;
