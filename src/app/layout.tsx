import HolyLoader from 'holy-loader';
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
        <HolyLoader
          color="linear-gradient(to right, #ff7e5f, #b224ef)"
          easing="linear"
          height="2px"
          showSpinner={false}
        />
        <Providers>
          <div id="main-container">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
