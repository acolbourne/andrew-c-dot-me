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
import type { SinglePost, SinglePostPageProps } from '@/types';

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

  const postData: SinglePost | null = await client.fetch(SINGLE_POST_QUERY, {
    postSlug
  });

  if (!postData) {
    notFound();
  }

  const adjacentPosts = await client.fetch(ADJACENT_POSTS_QUERY, {
    publishedAt: postData.publishedAt
  });

  const formattedDate = new Date(postData.publishedAt).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const imageUrl = postData.image
    ? urlFor(postData.image).width(1200).height(600).url()
    : '/images/demo.jpg';

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
        <header className="mb-10 flex flex-col gap-6">
          <div className="space-y-4">
            {postData.category ? (
              <div className="flex items-center gap-4 text-sm">
                <Link
                  className="font-bold text-accent-light uppercase tracking-wider transition-colors hover:opacity-80 dark:text-accent-dark"
                  href={`/categories/${postData.category.slug}`}
                >
                  {postData.category.title}
                </Link>
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <time
                  className="text-slate-500 dark:text-slate-400"
                  dateTime={postData.publishedAt}
                >
                  {formattedDate}
                </time>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-sm">
                <time
                  className="text-slate-500 dark:text-slate-400"
                  dateTime={postData.publishedAt}
                >
                  {formattedDate}
                </time>
              </div>
            )}

            <h1 className="font-extrabold text-3xl text-slate-900 leading-tight tracking-tight sm:text-5xl dark:text-white">
              {postData.title}
            </h1>
          </div>
        </header>

        {postData.image ? (
          <div className="mb-10 overflow-hidden rounded-xl shadow-sm">
            <Image
              alt={postData.title}
              className="h-auto w-full object-cover"
              height={600}
              src={imageUrl}
              width={1200}
            />
          </div>
        ) : null}

        {postData.body ? (
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none dark:prose-a:text-slate-300 dark:prose-blockquote:text-slate-300 dark:prose-code:text-slate-300 dark:prose-em:text-slate-300 dark:prose-li:text-slate-300 dark:prose-p:text-slate-300 dark:prose-strong:text-slate-200">
            <PortableText value={postData.body} />
          </div>
        ) : null}

        <SocialShare title={postData.title} url={`/posts/${postData.slug}`} />

        {!!postData.tags && postData.tags.length > 0 ? (
          <div className="mt-12 border-slate-200 border-t pt-8 dark:border-slate-800">
            <div className="flex flex-wrap gap-2 font-semibold text-xs">
              {postData.tags.map((tag) => (
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
        ) : null}

        {adjacentPosts?.previous || adjacentPosts?.next ? (
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
        ) : null}
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
