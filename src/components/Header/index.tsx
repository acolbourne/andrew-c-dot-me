import Link from 'next/link';
import { navItems, websiteSettings } from '@/constants';
import { ModeSelect } from '../ModeSelect';

const Header: React.FC = () => (
  <header className="mb-16 flex flex-row items-center justify-between">
    <Link
      className="font-bold text-xl tracking-tight transition-colors hover:text-accent-light dark:hover:text-accent-dark"
      href="/"
    >
      {websiteSettings.name}
    </Link>

    <div className="flex items-center gap-6">
      <nav className="hidden gap-6 font-semibold text-slate-600 text-sm sm:flex dark:text-slate-300">
        {Object.values(navItems).map((item) => (
          <Link
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
            href={item.url}
            key={item.url}
            target={item.target ?? '_self'}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <ModeSelect />
    </div>
  </header>
);

export default Header;
