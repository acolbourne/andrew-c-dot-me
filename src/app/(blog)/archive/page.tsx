import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { tv } from 'tailwind-variants';
import BlogPostListing from '@/components/BlogPostListing';
import Pagination from '@/components/Pagination';
import PostListingSkeleton from '@/components/Skeleton';
import { seoMetadata } from '@/lib/metadata';
import { ARCHIVE_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import type { ArchivePageProps, PostListing } from '@/types';

const archivePageVariants = tv({
  slots: {
    archiveSection: 'mb-16 border-slate-200 border-b pb-10 dark:border-slate-800',
    archiveSectionInner: 'mb-2',
    archiveSectionBrowsing:
      'font-bold text-slate-500 text-xs uppercase tracking-wider dark:text-slate-500',
    archiveSectionTitleContainer: 'flex flex-col sm:flex-row sm:items-baseline sm:justify-between',
    archiveSectionTitle:
      'font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white',
    archiveSectionNumberOfPosts:
      'mt-2 font-medium text-slate-500 text-sm sm:mt-0 dark:text-slate-400',
    archiveSectionDescription: 'mt-4 max-w-xl text-lg text-slate-700 dark:text-slate-300',
    postsListContainer: 'space-y-20'
  }
});

const {
  archiveSection,
  archiveSectionInner,
  archiveSectionBrowsing,
  archiveSectionTitleContainer,
  archiveSectionTitle,
  archiveSectionNumberOfPosts,
  archiveSectionDescription,
  postsListContainer
} = archivePageVariants();

const POSTS_PER_PAGE = 10;

export async function generateMetadata() {
  const t = await getTranslations('archive');

  return seoMetadata({
    title: t('title'),
    description: t('description')
  });
}

const PostsList = async ({ start, end }: { start: number; end: number }) => {
  const archiveData = await client.fetch(ARCHIVE_QUERY, {
    start,
    end
  });

  if (!archiveData?.posts || archiveData.posts.length === 0) {
    return null;
  }

  return (
    <>
      {archiveData.posts.map((post: PostListing) => (
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
  const skeletonKeys = Array.from({ length: POSTS_PER_PAGE }, (_, i) => `archive-skeleton-${i}`);
  return (
    <>
      {skeletonKeys.map((key) => (
        <PostListingSkeleton key={key} />
      ))}
    </>
  );
};

const ArchivePage = async ({ searchParams }: ArchivePageProps) => {
  const { page } = await searchParams;
  const currentPage = page ? Number.parseInt(page, 10) : 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const archiveData = await client.fetch(ARCHIVE_QUERY, {
    start,
    end
  });

  const t = await getTranslations('archive');
  const totalPages = Math.ceil((archiveData?.postCount || 0) / POSTS_PER_PAGE);

  return (
    <>
      <section className={archiveSection()}>
        <div className={archiveSectionInner()}>
          <span className={archiveSectionBrowsing()}>{t('browsingArchive')}</span>
        </div>
        <div className={archiveSectionTitleContainer()}>
          <h1 className={archiveSectionTitle()}>{t('title')}</h1>
          <span className={archiveSectionNumberOfPosts()}>
            {t('numberOfPosts', { count: archiveData?.postCount || 0 })}
          </span>
        </div>
        {archiveData?.postCount ? (
          <p className={archiveSectionDescription()}>{t('description')}</p>
        ) : null}
      </section>

      <section>
        <div className={postsListContainer()}>
          <Suspense fallback={<SkeletonFallback />}>
            <PostsList end={end} start={start} />
          </Suspense>
        </div>
      </section>

      <Pagination basePath="/archive" currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default ArchivePage;
