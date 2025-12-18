import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Metadata } from 'next/types';
import type { JSX } from 'react';

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

export type BlogPostListingProps = Omit<PostListing, '_id'>;

export type ContactFormResult = {
  data: Response | null;
  error: Error | null;
};

export type Success<T> = { data: T; error: null };
export type Failure<E> = { data: null; error: E };
export type Result<T, E = Error> = Success<T> | Failure<E>;
