import type { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';
import { seoMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const t = await getTranslations('archive');

  return seoMetadata({
    title: t('title'),
    description: t('description')
  });
}

const RSSPage: NextPage = () => <h1>Blog Posts Archive</h1>;

export default RSSPage;
