import { MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FaRedditAlien, FaXTwitter } from 'react-icons/fa6';
import { FiFacebook, FiLinkedin } from 'react-icons/fi';
import { tv } from 'tailwind-variants';
import { domain } from '@/constants';
import type { SocialShareLink, SocialShareProps } from '@/types';

const socialShareVariants = tv({
  slots: {
    base: 'mt-8 flex flex-wrap items-center gap-4',
    componentTitle: 'font-semibold text-slate-700 text-sm dark:text-slate-300',
    linkButton:
      'flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-accent-light hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-accent-dark dark:hover:text-slate-900',
    linkIcon: 'h-5 w-5'
  }
});

const { base, componentTitle, linkButton, linkIcon } = socialShareVariants();

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const t = useTranslations('socialShare');
  const fullUrl = url.startsWith('http')
    ? url
    : `${domain}${url.startsWith('/') ? url : `/${url}`}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks: SocialShareLink[] = [
    {
      name: t('x'),
      icon: FaXTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    },
    {
      name: t('facebook'),
      icon: FiFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: t('linkedin'),
      icon: FiLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      name: t('reddit'),
      icon: FaRedditAlien,
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
    },
    {
      name: t('email'),
      icon: MailIcon,
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
    }
  ];

  return (
    <div className={base()}>
      <span className={componentTitle()}>{t('share')}</span>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map(({ name, icon: Icon, url: linkUrl }) => (
          <a
            aria-label={t('shareOn', { name })}
            className={linkButton()}
            href={linkUrl}
            key={name}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className={linkIcon()} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
