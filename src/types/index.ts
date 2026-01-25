import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Metadata } from 'next/types';
import type { JSX } from 'react';
import type { Page, Post } from '../../sanity.types';

export type WebsiteConfig = Record<string, string>;
export type SocialNetworks = Record<string, { url: string; icon: JSX.Element }>;
export type NavItems = Record<string, { url: string; name: string; target?: '_blank' }>;

export interface ExtraMetadata extends Metadata {
  tags?: Record<string, string>;
  urlCanonical?: string;
}

export interface AlertMessage {
  icon?: React.ReactElement | null;
  type: 'info' | 'success' | 'warning' | 'error';
  style?: 'soft' | 'outline' | 'dash' | null;
  title?: string;
  message: string;
}

export interface PostListing {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  image?: SanityImageSource | null;
  category?: {
    title: string | null;
    slug: string | null;
  } | null;
  tags?: Array<{
    title: string | null;
    slug: string | null;
  }> | null;
  excerpt?: string | null;
}

export interface FeedPost {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string | null;
  image: { asset?: { _ref: string } } | null;
  category: { title: string; slug: string } | null;
  tags: Array<{ title: string | null; slug: string | null }> | null;
}

export type PostSlugs = Pick<PostListing, 'slug' | 'publishedAt'>;
export type BlogPostListingProps = Omit<PostListing, '_id'>;

export interface ArchivePageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export interface CategoryPageProps {
  params: Promise<{
    category?: string[];
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}

export interface TagPageProps {
  params: Promise<{
    tag?: string[];
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export interface SinglePostPageProps {
  params: Promise<{
    post?: string[];
  }>;
}

export interface GeneratedPageProps {
  params: Promise<{
    page?: string[];
  }>;
}

export interface SinglePost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  image?: SanityImageSource;
  body: NonNullable<Post['body']>;
  category?: {
    title: string;
    slug: string;
  };
  tags?: Array<{
    title: string;
    slug: string;
  }>;
}

export interface SinglePage {
  _id: string;
  title: string;
  slug: string;
  content: NonNullable<Page['content']>;
}

export interface NavPage {
  title: string;
  slug: string;
}

export interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export interface SocialShareLink {
  name: string;
  icon: React.ElementType;
  url: string;
}

export interface ContactFormResult {
  data: Response | null;
  error: Error | null;
}

export interface RecaptchaVerify {
  success: boolean;
  score?: number;
  error?: string;
}

export interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export interface Success<T> {
  data: T;
  error: null;
}
export interface Failure<E> {
  data: null;
  error: E;
}
export type Result<T, E = Error> = Success<T> | Failure<E>;

export interface RecaptchaWindow extends Window {
  grecaptcha?: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
}
