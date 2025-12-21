import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Metadata } from 'next/types';
import type { JSX } from 'react';
import type { Post } from '../../sanity.types';

export type WebsiteConfig = Record<string, string>;
export type SocialNetworks = Record<string, { url: string; icon: JSX.Element }>;
export type NavItems = Record<string, { url: string; name: string; target?: '_blank' }>;

export interface ExtraMetadata extends Metadata {
  tags?: Record<string, string>;
  urlCanonical?: string;
}

export type AlertMessage = {
  icon?: React.ReactElement | null;
  type: 'info' | 'success' | 'warning' | 'error';
  style?: 'soft' | 'outline' | 'dash' | null;
  title?: string;
  message: string;
};

export type PostListing = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  image?: SanityImageSource;
  category?: {
    title: string;
    slug: string;
  };
  tags?: Array<{
    title: string;
    slug: string;
  }>;
  excerpt?: string;
};

export type FeedPost = {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string | null;
  image: { asset?: { _ref: string } } | null;
  category: { title: string; slug: string } | null;
  tags: Array<{ title: string | null; slug: string | null }> | null;
};

export type PostSlugs = Pick<PostListing, 'slug' | 'publishedAt'>;
export type BlogPostListingProps = Omit<PostListing, '_id'>;

export type CategoryPageProps = {
  params: Promise<{
    category?: string[];
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
};

export type TagPageProps = {
  params: Promise<{
    tag?: string[];
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export type SinglePostPageProps = {
  params: Promise<{
    post?: string[];
  }>;
};

export type SinglePost = {
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
};

export type SocialShareProps = {
  title: string;
  url: string;
  description?: string;
};

export type SocialShareLink = {
  name: string;
  icon: React.ElementType;
  url: string;
};

export type ContactFormResult = {
  data: Response | null;
  error: Error | null;
};

export type RecaptchaVerify = {
  success: boolean;
  score?: number;
  error?: string;
};

export type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

export type Success<T> = { data: T; error: null };
export type Failure<E> = { data: null; error: E };
export type Result<T, E = Error> = Success<T> | Failure<E>;

export interface RecaptchaWindow extends Window {
  grecaptcha?: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
}
