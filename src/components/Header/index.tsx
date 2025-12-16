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
  </header>
);

export default Header;
