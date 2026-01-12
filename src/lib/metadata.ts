import { domain, websiteSettings } from '@/constants';
import { iconPaths } from '@/constants/icons';
import type { ExtraMetadata } from '@/types';

const getDefaultIcons = () => {
  const defaultFavicon = iconPaths.faviconLight || iconPaths.faviconDark || iconPaths.favicon;
  const defaultAppleIcon = iconPaths.appleTouchIconLight || iconPaths.appleTouchIconDark;

  return {
    icon: defaultFavicon || undefined,
    shortcut: defaultFavicon || undefined,
    apple: defaultAppleIcon || undefined
  };
};

export const seoMetadata = ({
  title,
  description,
  keywords,
  tags,
  urlCanonical,
  icons,
  alternates
}: ExtraMetadata) => {
  const mergedAlternates = {
    ...alternates,
    types: {
      'application/rss+xml': `${domain}/rss.xml`,
      ...alternates?.types
    },
    ...(urlCanonical && { canonical: urlCanonical })
  };

  return {
    title: title === undefined ? websiteSettings.name : `${title} | ${websiteSettings.name}`,
    description: description || websiteSettings.description,
    keywords: keywords || websiteSettings.keywords,
    icons: icons ?? getDefaultIcons(),
    alternates: mergedAlternates,
    metadataBase: domain,
    ...tags
  };
};
