import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PortableText } from 'next-sanity';
import { Suspense } from 'react';
import SinglePostSkeleton from '@/components/Skeleton/single';
import SocialShare from '@/components/SocialShare';
import { seoMetadata } from '@/lib/metadata';
import { ADJACENT_POSTS_QUERY, SINGLE_POST_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { SinglePostPageProps } from '@/types';
import type {
  ADJACENT_POSTS_QUERYResult,
  SINGLE_POST_QUERYResult
} from '../../../../../sanity.types';

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return '';
  }
  return new Date(dateString).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const getImageUrl = (image: NonNullable<SINGLE_POST_QUERYResult>['image']): string =>
  image ? urlFor(image).width(1200).height(600).url() : '/images/demo.jpg';

const PostHeader = ({
  category,
  publishedAt,
  title
}: {
  category: NonNullable<SINGLE_POST_QUERYResult>['category'];
  publishedAt: string | null | undefined;
  title: string | null | undefined;
}) => {
  const formattedDate = formatDate(publishedAt);

  return (
    <header className="mb-10 flex flex-col gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
          {category?.slug ? (
            <>
              <Link
                className="font-bold text-accent-light uppercase tracking-wider transition-colors hover:opacity-80 dark:text-accent-dark"
                href={`/categories/${category.slug}`}
              >
                {category.title}
              </Link>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            </>
          ) : null}
          <time className="text-slate-500 dark:text-slate-400" dateTime={publishedAt || ''}>
            {formattedDate}
          </time>
        </div>
        <h1 className="font-extrabold text-3xl text-slate-900 leading-tight tracking-tight sm:text-5xl dark:text-white">
          {title}
        </h1>
      </div>
    </header>
  );
};

const PostImage = ({
  image,
  title
}: {
  image: NonNullable<SINGLE_POST_QUERYResult>['image'];
  title: string | null | undefined;
}) => {
  if (!image) {
    return null;
  }

  const imageUrl = getImageUrl(image);

  return (
    <div className="mb-10 overflow-hidden rounded-xl shadow-sm">
      <Image
        alt={title || ''}
        className="h-auto w-full object-cover"
        height={600}
        src={imageUrl}
        width={1200}
      />
    </div>
  );
};

const PostBody = ({ body }: { body: NonNullable<SINGLE_POST_QUERYResult>['body'] }) => {
  if (!body) {
    return null;
  }

  return (
    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none dark:prose-a:text-accent-dark dark:prose-blockquote:text-slate-300 dark:prose-code:text-slate-300 dark:prose-em:text-slate-300 dark:prose-li:text-slate-300 dark:prose-p:text-slate-300 dark:prose-strong:text-slate-200 dark:prose-a:hover:text-accent-dark/90">
      <PortableText value={body} />
    </div>
  );
};

const PostTags = ({ tags }: { tags: NonNullable<SINGLE_POST_QUERYResult>['tags'] }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-slate-200 border-t pt-8 dark:border-slate-800">
      <div className="flex flex-wrap gap-2 font-semibold text-xs">
        {tags.map((tag: { title: string | null; slug: string | null }) => (
          <Link
            className="rounded bg-slate-100 px-3 py-1.5 text-slate-700 transition-colors hover:bg-accent-light hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-accent-dark dark:hover:text-slate-900"
            href={`/tags/${tag.slug}`}
            key={tag.slug}
          >
            #{tag.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

const AdjacentPostsNav = ({
  adjacentPosts,
  t
}: {
  adjacentPosts: ADJACENT_POSTS_QUERYResult;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) => {
  if (!(adjacentPosts?.previous || adjacentPosts?.next)) {
    return null;
  }

  return (
    <nav className="mt-12 flex justify-between gap-4">
      {adjacentPosts?.previous ? (
        <Link
          className="group flex flex-col text-left text-sm"
          href={`/posts/${adjacentPosts.previous.slug}`}
        >
          <span className="mb-1 text-slate-500 transition-colors group-hover:text-accent-light dark:text-slate-500 dark:group-hover:text-accent-dark">
            &larr; {t('previousPost')}
          </span>
          <span className="font-bold text-slate-900 dark:text-white">
            {adjacentPosts.previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {adjacentPosts?.next ? (
        <Link
          className="group flex flex-col text-right text-sm"
          href={`/posts/${adjacentPosts.next.slug}`}
        >
          <span className="mb-1 text-slate-500 transition-colors group-hover:text-accent-light dark:text-slate-500 dark:group-hover:text-accent-dark">
            {t('nextPost')} &rarr;
          </span>
          <span className="font-bold text-slate-900 dark:text-white">
            {adjacentPosts.next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
};

export async function generateMetadata({ params }: SinglePostPageProps) {
  const { post } = await params;
  const postSlug = post?.join('/') || '';
  const t = await getTranslations('singlePost');

  const postData = await client.fetch(SINGLE_POST_QUERY, {
    postSlug
  });

  if (!postData) {
    return seoMetadata({
      title: t('notFound'),
      description: ''
    });
  }

  return seoMetadata({
    title: postData.title,
    description: postData.body ? `${postData.title} - ${t('description')}` : postData.title
  });
}

const PostContent = async ({ postSlug }: { postSlug: string }) => {
  const t = await getTranslations('singlePost');

  const postData: SINGLE_POST_QUERYResult = await client.fetch(SINGLE_POST_QUERY, {
    postSlug
  });

  if (!postData) {
    notFound();
  }

  const adjacentPosts: ADJACENT_POSTS_QUERYResult = await client.fetch(ADJACENT_POSTS_QUERY, {
    publishedAt: postData.publishedAt
  });

  return (
    <>
      <div className="mb-8">
        <Link
          className="inline-flex items-center font-semibold text-slate-500 text-sm transition-colors hover:text-accent-light dark:text-slate-400 dark:hover:text-accent-dark"
          href="/"
        >
          &larr; {t('backToBlog')}
        </Link>
      </div>

      <article>
        <PostHeader
          category={postData.category}
          publishedAt={postData.publishedAt}
          title={postData.title}
        />
        <PostImage image={postData.image} title={postData.title} />
        <PostBody body={postData.body} />
        <SocialShare title={postData.title || ''} url={`/posts/${postData.slug || ''}`} />
        <PostTags tags={postData.tags} />
        <AdjacentPostsNav adjacentPosts={adjacentPosts} t={t} />
      </article>
    </>
  );
};

const SinglePostPage = async ({ params }: SinglePostPageProps) => {
  const { post } = await params;
  const postSlug = post?.join('/') || '';

  if (!postSlug) {
    notFound();
  }

  return (
    <Suspense fallback={<SinglePostSkeleton />}>
      <PostContent postSlug={postSlug} />
    </Suspense>
  );
};

export default SinglePostPage;
