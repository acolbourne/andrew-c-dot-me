import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/ContactForm';
import { seoMetadata } from '@/lib/metadata';

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
    <section className="mx-auto max-w-full">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="mb-4 font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white">
          {t('heading')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">{t('subheading')}</p>
      </div>

      <ContactForm />
    </section>
  );
};

export default ContactMePage;
