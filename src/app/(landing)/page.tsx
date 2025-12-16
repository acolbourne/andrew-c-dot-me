import type { NextPage } from 'next';
import HeroSection from '@/components/HeroSection/page';

const Homepage: NextPage = () => (
  <>
    <HeroSection />

    <section>
      <div className="mb-8 flex items-end justify-between border-slate-200 border-b pb-2 dark:border-slate-800">
        <h2 className="font-bold text-slate-600 text-sm uppercase tracking-wider dark:text-slate-400">
          Latest Articles
        </h2>
        <a
          className="font-medium text-accent-light text-xs hover:underline dark:text-accent-dark"
          href="/archive"
        >
          View Archive
        </a>
      </div>
    </section>
  </>
);

export default Homepage;
