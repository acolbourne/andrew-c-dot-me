import type { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';
import { seoMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const t = await getTranslations('rss');

  return seoMetadata({
    title: t('title'),
    description: t('description')
  });
}

const RSSPage: NextPage = () => <h1>RSS Feed placeholder</h1>;

export default RSSPage;
