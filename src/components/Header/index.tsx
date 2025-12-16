import Link from 'next/link';
import { navItems, websiteSettings } from '@/constants';
import Navigation from '../Navigation';

const Header: React.FC = () => (
  <header>
    <Link
      className="font-bold text-xl tracking-tight transition-colors hover:text-accent-light dark:hover:text-accent-dark"
      href="/"
    >
      {websiteSettings.name}
    </Link>

    <div className="flex items-center gap-6">
      <Navigation items={navItems} />
    </div>

    {/* <div id="mobile-nav">
      {Object.values(navItems).map((item) => (
        <Link
          className="block font-semibold text-lg text-slate-700 transition-colors hover:text-accent-light dark:text-slate-200 dark:hover:text-accent-dark"
          href={item.url}
          key={item.url}
          target={item.target ?? '_self'}
        >
          {item.name}
        </Link>
      ))}
    </div> */}
  </header>
);

export default Header;
