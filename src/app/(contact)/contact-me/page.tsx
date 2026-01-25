import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { tv } from 'tailwind-variants';
import { ContactForm } from '@/components/ContactForm';
import { seoMetadata } from '@/lib/metadata';

const contactPageVariants = tv({
  slots: {
    base: 'mx-auto max-w-full',
    contactHeading: 'mb-10 text-center sm:text-left',
    contactHeadingTitle:
      'mb-4 font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white',
    contactHeadingSubtitle: 'text-lg text-slate-600 dark:text-slate-400'
  }
});

const { base, contactHeading, contactHeadingTitle, contactHeadingSubtitle } = contactPageVariants();

export async function generateMetadata() {
  const t = await getTranslations('contact');

  return seoMetadata({
    title: t('title'),
    description: t('description')
  });
}

const ContactMePage: NextPage = () => {
  const t = useTranslations('contact');

  return (
    <section className={base()}>
      <div className={contactHeading()}>
        <h1 className={contactHeadingTitle()}>{t('heading')}</h1>
        <p className={contactHeadingSubtitle()}>{t('subheading')}</p>
      </div>

      <ContactForm />
    </section>
  );
};

export default ContactMePage;
