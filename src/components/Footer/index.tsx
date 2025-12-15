import Link from 'next/link';
import { footerNavItems, websiteSettings } from '@/constants';

const Footer: React.FC = () => {
  const fullYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        &copy; {fullYear} {websiteSettings.name}
      </div>
      <div className="mt-4 flex gap-4 sm:mt-0">
        {Object.values(footerNavItems).map((item) => (
          <Link
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
            href={item.url}
            key={item.url}
            target={item.target ?? '_self'}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
