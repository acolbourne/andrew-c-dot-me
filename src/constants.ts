import { iconPaths } from '@/constants/icons';
import type { NavItems, WebsiteConfig } from '@/types';
import { env } from './env';

export const domain: string =
  env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://andrew-c.me';
export const defaultLocale: string = 'en-GB';

export const websiteSettings: WebsiteConfig = {
  name: 'Andrew Colbourne',
  nickname: 'Andy',
  title: 'Blog',
  description: 'My personal blog.',
  keywords: 'blog, personal, programming, tech',
  ...iconPaths,
  domain,
  defaultLocale
} as const;

export const navItems: NavItems = {
  blog: { url: '/', name: 'Blog' },
  contact: { url: '/contact-me', name: 'Contact' }
};

export const footerNavItems: NavItems = {
  twitter: { url: 'https://www.twitter.com/andyctrader', name: '𝕏', target: '_blank' },
  github: {
    url: 'https://github.com/acolbourne/andrew-c-dot-me',
    name: 'GitHub',
    target: '_blank'
  },
  termsOfUse: { url: '/page/terms-of-use', name: 'Terms' },
  privacy: { url: '/page/privacy', name: 'Privacy' },
  rss: { url: '/rss.xml', name: 'RSS' }
};
