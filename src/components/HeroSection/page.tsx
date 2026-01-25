import { useTranslations } from 'next-intl';
import { tv } from 'tailwind-variants';
import { websiteSettings } from '@/constants';

const heroSectionVariants = tv({
  slots: {
    headingOuter:
      'mb-6 font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white',
    headingInner: 'text-accent-light dark:text-accent-dark',
    blurb: 'text-lg text-slate-700 leading-relaxed dark:text-slate-300'
  }
});

const { headingOuter, headingInner, blurb } = heroSectionVariants();

const HeroSection: React.FC = () => {
  const t = useTranslations('heroSection');

  return (
    <section id="hero-section">
      <h1 className={headingOuter()}>
        {t('title')}
        <span className={headingInner()}> {websiteSettings.nickname}</span>.
      </h1>
      <p className={blurb()}>{t('blurb')}</p>
    </section>
  );
};

export default HeroSection;
