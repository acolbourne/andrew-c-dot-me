import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import BlogPostListing from '@/components/BlogPostListing';
import Pagination from '@/components/Pagination';
import PostListingSkeleton from '@/components/Skeleton';
import { seoMetadata } from '@/lib/metadata';
import { TAG_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import type { PostListing, TagPageProps } from '@/types';

const POSTS_PER_PAGE = 10;

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const tagSlug = tag?.join('/') || '';
  const t = await getTranslations('tag');

  const tagData = await client.fetch(TAG_QUERY, {
    tagSlug,
    start: 0,
    end: 0
  });

  if (!tagData) {
    return seoMetadata({
      title: t('notFound'),
      description: t('description')
    });
  }

  return seoMetadata({
    title: t('title', { tagName: tagData.title }),
    description: tagData.description || t('description')
  });
}

const PostsList = async ({
  end,
  start,
  tagSlug
}: {
  end: number;
  start: number;
  tagSlug: string;
}) => {
  const tagData = await client.fetch(TAG_QUERY, {
    tagSlug,
    start,
    end
  });

  if (!tagData?.posts || tagData.posts.length === 0) {
    return null;
  }

  return (
    <>
      {tagData.posts.map((post: PostListing) => (
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
  const skeletonKeys = Array.from({ length: POSTS_PER_PAGE }, (_, i) => `tag-skeleton-${i}`);
  return (
    <>
      {skeletonKeys.map((key) => (
        <PostListingSkeleton key={key} />
      ))}
    </>
  );
};

const SingleTagPage = async ({ params, searchParams }: TagPageProps) => {
  const { tag } = await params;
  const tagSlug = tag?.join('/') || '';
  const t = await getTranslations('tag');

  if (!tagSlug) {
    notFound();
  }

  const { page } = searchParams ? await searchParams : { page: undefined };
  const currentPage = page ? Number.parseInt(page, 10) : 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const tagData = await client.fetch(TAG_QUERY, {
    tagSlug,
    start,
    end
  });

  if (!tagData) {
    notFound();
  }

  const totalPages = Math.ceil((tagData.postCount || 0) / POSTS_PER_PAGE);
  const basePath = `/tags/${tagSlug}`;

  return (
    <>
      <section className="mb-16 border-slate-200 border-b pb-10 dark:border-slate-800">
        <div className="mb-2">
          <span className="font-bold text-slate-500 text-xs uppercase tracking-wider dark:text-slate-500">
            {t('browsingTag')}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white">
            {tagData.title}
          </h1>
          <span className="mt-2 font-medium text-slate-500 text-sm sm:mt-0 dark:text-slate-400">
            {t('numberOfPosts', { count: tagData.postCount })}
          </span>
        </div>
        {tagData.description ? (
          <p className="mt-4 max-w-xl text-lg text-slate-700 dark:text-slate-300">
            {tagData.description}
          </p>
        ) : null}
      </section>

      <section>
        <div className="space-y-20">
          <Suspense fallback={<SkeletonFallback />}>
            <PostsList end={end} start={start} tagSlug={tagSlug} />
          </Suspense>
        </div>
      </section>

      <Pagination basePath={basePath} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default SingleTagPage;
