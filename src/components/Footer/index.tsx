import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { tv } from 'tailwind-variants';
import { footerNavItems, websiteSettings } from '@/constants';

const footerVariants = tv({
  slots: {
    navigation: 'mt-4 flex gap-4 sm:mt-0',
    link: 'transition-colors hover:text-slate-900 dark:hover:text-white'
  }
});

const { navigation, link } = footerVariants();

const Footer: React.FC = () => {
  const t = useTranslations('footer');

  return (
    <footer>
      <div>
        {t('copyright', { year: new Date().getFullYear(), websiteName: websiteSettings.name })}
      </div>
      <div className={navigation()}>
        {Object.values(footerNavItems).map((item) => (
          <Link className={link()} href={item.url} key={item.url} target={item.target ?? '_self'}>
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
