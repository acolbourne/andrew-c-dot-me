import type { NextPage } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import HeroSection from '@/components/HeroSection/page';

const Homepage: NextPage = () => {
  const t = useTranslations('homepage');
  return (
    <>
      <HeroSection />

      <section>
        <div className="mb-8 flex items-end justify-between border-slate-200 border-b pb-2 dark:border-slate-800">
          <h2 className="font-bold text-slate-600 text-sm uppercase tracking-wider dark:text-slate-400">
            {t('latestArticles')}
          </h2>
          <Link
            className="font-medium text-accent-light text-xs hover:underline dark:text-accent-dark"
            href="/archive"
          >
            {t('viewArchive')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Homepage;
