import type { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';
import { seoMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const t = await getTranslations('contact');

  return seoMetadata({
    title: t('title'),
    description: t('description')
  });
}

const ContactMePage: NextPage = () => (
  <section className="mx-auto max-w-full">
    <div className="mb-10 text-center sm:text-left">
      <h1 className="mb-4 font-extrabold text-3xl text-slate-900 tracking-tight sm:text-4xl dark:text-white">
        Get in Touch
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        Have a question, an idea, or just want to say hi? Fill out the form below and I will get
        back to you as soon as possible.
      </p>
    </div>

    <form className="flex flex-col gap-5">
      <div className="form-control w-full">
        <label className="label pt-0 pb-1" htmlFor="name">
          <span className="label-text font-bold text-slate-700 dark:text-slate-300">Name</span>
        </label>
        <input
          className="input input-bordered w-full rounded-lg border-slate-300 bg-slate-50 text-slate-900 transition-all focus:border-accent-light focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-accent-dark"
          id="name"
          name="name"
          placeholder="Jane Doe"
          type="text"
        />
      </div>

      <div className="form-control w-full">
        <label className="label pt-0 pb-1" htmlFor="email">
          <span className="label-text font-bold text-slate-700 dark:text-slate-300">Email</span>
        </label>
        <input
          className="input input-bordered w-full rounded-lg border-slate-300 bg-slate-50 text-slate-900 transition-all focus:border-accent-light focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-accent-dark"
          id="email"
          name="email"
          placeholder="jane@example.com"
          type="email"
        />
      </div>

      <div className="form-control w-full">
        <label className="label pt-0 pb-1" htmlFor="message">
          <span className="label-text font-bold text-slate-700 dark:text-slate-300">Message</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-40 w-full rounded-lg border-slate-300 bg-slate-50 text-base text-slate-900 transition-all focus:border-accent-light focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-accent-dark"
          id="message"
          name="message"
          placeholder="Please enter your message here."
        />
      </div>

      <button
        className="btn btn-block mt-6 h-12 rounded-lg border-none bg-accent-light font-bold text-base text-white normal-case hover:bg-blue-700 dark:bg-accent-dark dark:text-slate-900 dark:hover:bg-blue-400"
        type="button"
      >
        Send Message
      </button>
    </form>
  </section>
);

export default ContactMePage;
