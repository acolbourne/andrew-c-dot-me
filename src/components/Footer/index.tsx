import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { footerNavItems, websiteSettings } from '@/constants';

const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const fullYear = new Date().getFullYear();

  return (
    <footer>
      <div>{t('copyright', { fullYear, websiteName: websiteSettings.name })}</div>
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
