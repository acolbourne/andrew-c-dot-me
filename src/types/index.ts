import type { Metadata } from 'next/types';
import type { JSX } from 'react';

export type WebsiteConfig = Record<string, string>;
export type SocialNetworks = Record<string, { url: string; icon: JSX.Element }>;

export interface ExtraMetadata extends Metadata {
  tags?: Record<string, string>;
  urlCanonical?: string;
}
