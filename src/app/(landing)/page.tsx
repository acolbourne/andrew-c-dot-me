import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import BlogPostListing from '@/components/BlogPostListing';
import HeroSection from '@/components/HeroSection/page';
import Pagination from '@/components/Pagination';
import { ARCHIVE_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import type { PostListing } from '@/types';

type HomepageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const POSTS_PER_PAGE = 5;

const Homepage = async ({ searchParams }: HomepageProps) => {
  const { page } = searchParams ? await searchParams : { page: undefined };
  const currentPage = page ? Number.parseInt(page, 10) : 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const homepageData = await client.fetch(ARCHIVE_QUERY, {
    start,
    end
  });

  const t = await getTranslations('homepage');
  const totalPages = Math.ceil((homepageData?.postCount || 0) / POSTS_PER_PAGE);

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
          {!!homepageData?.posts && homepageData.posts.length > 0
            ? homepageData.posts.map((post: PostListing) => (
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

        <Pagination basePath="/" currentPage={currentPage} totalPages={totalPages} />
      </section>
    </>
  );
};

export default Homepage;
