import type { NextPage } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { seoMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const t = await getTranslations('error404');

  return seoMetadata({
    title: t('title'),
    description: t('description')
  });
}

const Error404Page: NextPage = () => {
  const t = useTranslations('error404');

  return (
    <>
      <h1 className="mb-8 select-none font-extrabold text-9xl text-slate-200 tracking-tighter sm:mb-10 dark:text-slate-800">
        {t('errorCode')}
      </h1>

      <h2 className="mb-4 font-bold text-3xl text-slate-900 dark:text-white">{t('title')}</h2>

      <p className="mb-10 text-lg text-slate-600 leading-relaxed dark:text-slate-400">
        {t('content')}
      </p>

      <Link
        className="btn h-12 rounded-lg border-none bg-slate-900 px-8 font-bold text-base text-white normal-case hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-200"
        href="/"
      >
        {t('goBackHome')}
      </Link>
    </>
  );
};

export default Error404Page;
