import { useTranslations } from 'next-intl';
import { websiteSettings } from '@/constants';

const HeroSection: React.FC = () => {
  const t = useTranslations('heroSection');

  return (
    <section id="hero-section">
      <h1 className="mb-6 font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white">
        {t('title')}
        <span className="text-accent-light dark:text-accent-dark"> {websiteSettings.nickname}</span>
        .
      </h1>
      <p className="text-lg text-slate-700 leading-relaxed dark:text-slate-300">{t('blurb')}</p>
    </section>
  );
};

export default HeroSection;
