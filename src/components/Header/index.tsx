import Link from 'next/link';
import { navItems, websiteSettings } from '@/constants';
import { PAGES_NAV_QUERY } from '@/sanity/groq/queries';
import { client } from '@/sanity/lib/client';
import type { NavItems, SinglePage } from '@/types';
import Navigation from '../Navigation';

const Header = async () => {
  let pages: SinglePage[] = [];
  try {
    pages = await client.fetch(PAGES_NAV_QUERY);
  } catch (error) {
    console.error('Failed to fetch navigation pages:', error);
  }

  const pagesNavItems: NavItems = {};
  for (const page of pages) {
    const key = page.slug.replace(/-/g, '_');
    pagesNavItems[key] = {
      url: `/page/${page.slug}`,
      name: page.title
    };
  }

  const { contact, ...otherNavItems } = navItems;

  const mergedNavItems: NavItems = {
    ...otherNavItems,
    ...pagesNavItems,
    contact
  };

  return (
    <header>
      <Link
        className="font-bold text-xl tracking-tight transition-colors hover:text-accent-light dark:hover:text-accent-dark"
        href="/"
      >
        {websiteSettings.name}
      </Link>

      <div className="flex items-center gap-6">
        <Navigation items={mergedNavItems} />
      </div>
    </header>
  );
};

export default Header;
