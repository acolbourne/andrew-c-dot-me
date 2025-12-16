import Providers from '@/components/Providers';
import { websiteSettings } from '@/constants';
import { seoMetadata } from '@/lib/metadata';
import type { ExtraMetadata } from '@/types';
import { interFont } from './typography';

import '@/cssfiles/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

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
      <body
        className={`bg-white ${interFont} text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-100`}
      >
        <Providers>
          <div id="main-container">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
