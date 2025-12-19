import type { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';
import { seoMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const t = await getTranslations('about');

  return seoMetadata({
    title: t('title'),
    description: t('description')
  });
}

const AboutMePage: NextPage = () => (
  <section>
    <h1 className="mb-8 font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white">
      About Me
    </h1>

    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 leading-relaxed dark:text-slate-300">
      <p className="mb-6">Profile here.</p>
    </div>
  </section>
);

export default AboutMePage;
