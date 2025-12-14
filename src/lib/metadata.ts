import { domain, websiteSettings } from '@/constants';
import type { ExtraMetadata } from '@/types';

export const seoMetadata = ({
  title,
  description,
  keywords,
  tags,
  urlCanonical
}: ExtraMetadata) => ({
  title: title === undefined ? websiteSettings.name : `${title} | ${websiteSettings.name}`,
  description: description || websiteSettings.description,
  keywords: keywords || websiteSettings.keywords,
  icons: {
    icon: websiteSettings.favicon ?? null,
    shortcut: websiteSettings.favicon ?? null,
    apple: websiteSettings.faviconApple ?? null,
    android: websiteSettings.faviconAndroid ?? null
  },
  alternates: {
    types: {
      'application/rss+xml': `${domain}/rss.xml`
    }
  },
  metadataBase: domain,
  ...(urlCanonical && { alternates: { canonical: urlCanonical } }),
  ...tags
});
