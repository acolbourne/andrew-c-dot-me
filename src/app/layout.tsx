import Providers from '@/components/Providers';
import { domain, websiteSettings } from '@/constants';
import { seoMetadata } from '@/lib/metadata';
import type { ExtraMetadata } from '@/types';
import { interFont } from './typography';

import '@/cssfiles/globals.css';
import { getLocale, getMessages } from 'next-intl/server';
import { ViewTransition } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata: ExtraMetadata = seoMetadata({
  title: websiteSettings.title,
  description: websiteSettings.description,
  alternates: {
    types: {
      'application/atom+xml': `${domain}/atom.xml`,
      'application/rss+xml': `${domain}/rss.xml`,
      'application/json': `${domain}/posts.json`,
      'application/xml': `${domain}/sitemap.xml`
    }
  }
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const currentLocale = await getLocale();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.className} antialiased`}>
        <Providers locale={currentLocale} messages={messages}>
          <div id="main-container">
            <Header />
            <ViewTransition>
              <main>{children}</main>
            </ViewTransition>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
