import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PortableText } from 'next-sanity';
import { cache, Suspense } from 'react';
import SinglePostSkeleton from '@/components/Skeleton/single';
import { seoMetadata } from '@/lib/metadata';
import { PAGE_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import type { GeneratedPageProps, SinglePage } from '@/types';

const fetchPageData = cache(
  async (pageSlug: string): Promise<SinglePage | null> => client.fetch(PAGE_QUERY, { pageSlug })
);

export async function generateMetadata({ params }: GeneratedPageProps) {
  const t = await getTranslations('generatedPages');
  const { page } = await params;
  const pageSlug = page?.join('/') || '';

  const pageData = await fetchPageData(pageSlug);

  if (!pageData) {
    return seoMetadata({
      title: t('notFound'),
      description: t('notFoundDescription')
    });
  }

  return seoMetadata({
    title: pageData.title,
    description: pageData.content ? `${pageData.title} - ${t('description')}` : pageData.title
  });
}

const PageContent = ({ pageData }: { pageData: SinglePage }) => (
  <section id="page-content">
    <h1 className="mb-8 font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white">
      {pageData.title}
    </h1>

    {pageData.content ? (
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 leading-relaxed dark:prose-a:text-accent-dark dark:prose-headings:text-white dark:prose-li:text-slate-200 dark:prose-strong:text-slate-100 dark:text-slate-200 dark:prose-a:hover:text-accent-dark/90">
        <PortableText value={pageData.content} />
      </div>
    ) : null}
  </section>
);

const GeneratedPage = async ({ params }: GeneratedPageProps) => {
  const { page } = await params;
  const pageSlug = page?.join('/') || '';

  if (!pageSlug) {
    notFound();
  }

  const pageData = await fetchPageData(pageSlug);

  if (!pageData) {
    notFound();
  }

  return (
    <Suspense fallback={<SinglePostSkeleton />}>
      <PageContent pageData={pageData} />
    </Suspense>
  );
};

export default GeneratedPage;
