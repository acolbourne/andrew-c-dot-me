import type { NextPage } from 'next';
import Link from 'next/link';
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
      <p className="mb-6">
        Hello! I'm a developer, writer, and open-source enthusiast based in San Francisco. I spend
        my days building web applications and my nights writing about the process.
      </p>
      <p className="mb-6">
        I started coding when I was 15, hacking together themes for MySpace and WordPress. That
        curiosity eventually led me to a career in software engineering. Over the years, I've worked
        with startups, agencies, and large corporations, but my passion has always been in
        simplifying complex systems.
      </p>
      <p className="mb-6">
        Currently, I'm focused on <strong>minimalist web design</strong> and{' '}
        <strong>performance optimization</strong>. I believe that the web works best when it's
        accessible, fast, and respectful of the user's time.
      </p>

      <h3 className="mt-10 mb-4 font-bold text-slate-900 text-xl dark:text-white">What I use</h3>
      <ul className="mb-10 list-disc space-y-2 pl-5">
        <li>
          <strong>Editor:</strong> VS Code with the Tokyo Night theme.
        </li>
        <li>
          <strong>Terminal:</strong> Warp with Oh My Zsh.
        </li>
        <li>
          <strong>Stack:</strong> React, Tailwind CSS, TypeScript, and Node.js.
        </li>
        <li>
          <strong>Hardware:</strong> MacBook Pro M1, Keychron K2, MX Master 3.
        </li>
      </ul>

      <h3 className="mt-10 mb-4 font-bold text-slate-900 text-xl dark:text-white">Connect</h3>
      <p className="mb-6">
        I'm always open to new opportunities, collaborations, or just chatting about the latest tech
        trends. Feel free to reach out to me via{' '}
        <Link className="font-medium text-blue-500 underline hover:no-underline" href="/contact-me">
          email
        </Link>{' '}
        or follow me on social media.
      </p>
    </div>
  </section>
);

export default AboutMePage;
