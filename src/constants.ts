import type { NavItems, WebsiteConfig } from '@/types';
import { env } from './env';

export const websiteSettings: WebsiteConfig = {
  name: 'Andrew Colbourne',
  nickname: 'Andy',
  title: 'Blog',
  description: 'My personal blog.',
  keywords: 'blog, personal, programming, tech',
  domain: env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://andrew-c.me',
  defaultLocale: 'en-GB'
} as const;

export const navItems: NavItems = {
  blog: { url: '/', name: 'Blog' },
  about: { url: '/about-me', name: 'About' },
  contact: { url: '/contact-me', name: 'Contact' }
};

export const footerNavItems: NavItems = {
  twitter: { url: 'https://www.twitter.com/andyctrader', name: 'Twitter', target: '_blank' },
  github: {
    url: 'https://github.com/acolbourne/andrew-c-dot-me',
    name: 'GitHub',
    target: '_blank'
  },
  rss: { url: '/rss.xml', name: 'RSS' }
};

export const domain: string = websiteSettings.domain;
export const defaultLocale: string = websiteSettings.defaultLocale;
