import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import BlogPostListing from '@/components/BlogPostListing';
import Pagination from '@/components/Pagination';
import PostListingSkeleton from '@/components/Skeleton';
import { seoMetadata } from '@/lib/metadata';
import { CATEGORY_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import type { CategoryPageProps, PostListing } from '@/types';

const POSTS_PER_PAGE = 10;

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categorySlug = category?.join('/') || '';
  const t = await getTranslations('category');

  const categoryData = await client.fetch(CATEGORY_QUERY, {
    categorySlug,
    start: 0,
    end: 0
  });

  if (!categoryData) {
    return seoMetadata({
      title: t('notFound'),
      description: t('description')
    });
  }

  return seoMetadata({
    title: t('title', { categoryName: categoryData.title }),
    description: categoryData.description || t('description')
  });
}

const PostsList = async ({
  categorySlug,
  end,
  start
}: {
  categorySlug: string;
  end: number;
  start: number;
}) => {
  const categoryData = await client.fetch(CATEGORY_QUERY, {
    categorySlug,
    start,
    end
  });

  if (!categoryData?.posts || categoryData.posts.length === 0) {
    return null;
  }

  return (
    <>
      {categoryData.posts.map((post: PostListing) => (
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
      ))}
    </>
  );
};

const SkeletonFallback = () => {
  const skeletonKeys = Array.from({ length: POSTS_PER_PAGE }, (_, i) => `category-skeleton-${i}`);
  return (
    <>
      {skeletonKeys.map((key) => (
        <PostListingSkeleton key={key} />
      ))}
    </>
  );
};

const SingleCategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { category } = await params;
  const categorySlug = category?.join('/') || '';
  const t = await getTranslations('category');

  if (!categorySlug) {
    notFound();
  }

  const { page } = searchParams ? await searchParams : { page: undefined };
  const currentPage = page ? Number.parseInt(page, 10) : 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const categoryData = await client.fetch(CATEGORY_QUERY, {
    categorySlug,
    start,
    end
  });

  if (!categoryData) {
    notFound();
  }

  const totalPages = Math.ceil((categoryData.postCount || 0) / POSTS_PER_PAGE);
  const basePath = `/categories/${categorySlug}`;

  return (
    <>
      <section className="mb-16 border-slate-200 border-b pb-10 dark:border-slate-800">
        <div className="mb-2">
          <span className="font-bold text-slate-500 text-xs uppercase tracking-wider dark:text-slate-500">
            {t('browsingCategory')}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white">
            {categoryData.title}
          </h1>
          <span className="mt-2 font-medium text-slate-500 text-sm sm:mt-0 dark:text-slate-400">
            {t('numberOfPosts', { count: categoryData.postCount })}
          </span>
        </div>
        {categoryData.description ? (
          <p className="mt-4 max-w-xl text-lg text-slate-700 dark:text-slate-300">
            {categoryData.description}
          </p>
        ) : null}
      </section>

      <section>
        <div className="space-y-20">
          <Suspense fallback={<SkeletonFallback />}>
            <PostsList categorySlug={categorySlug} end={end} start={start} />
          </Suspense>
        </div>
      </section>

      <Pagination basePath={basePath} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default SingleCategoryPage;
