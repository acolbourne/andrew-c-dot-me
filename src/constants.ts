import type { WebsiteConfig } from '@/types';
import { env } from './env';

export const websiteSettings: WebsiteConfig = {
  name: 'Andrew Colbourne',
  title: 'Blog',
  description: 'My personal blog.',
  keywords: 'blog, personal, programming, tech',
  domain: env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://andrew-c.me',
  defaultLocale: 'en-GB'
} as const;

export const domain: string = websiteSettings.domain;
export const defaultLocale: string = websiteSettings.defaultLocale;
