import HolyLoader from 'holy-loader';
import Providers from '@/components/Providers';
import { websiteSettings } from '@/constants';
import { seoMetadata } from '@/lib/metadata';
import type { ExtraMetadata } from '@/types';
import { geistMono, geistSans } from './typography';

import '@/cssfiles/globals.css';

export const metadata: ExtraMetadata = seoMetadata({
  title: websiteSettings.title,
  description: websiteSettings.description
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HolyLoader
          color="linear-gradient(to right, #ff7e5f, #b224ef)"
          easing="linear"
          height="2px"
          showSpinner={false}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
