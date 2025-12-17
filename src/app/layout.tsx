import Providers from '@/components/Providers';
import { defaultLocale, websiteSettings } from '@/constants';
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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = (await import(`@/language/${defaultLocale}.json`)).default;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.className} antialiased`}>
        <Providers locale={defaultLocale} messages={messages}>
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
