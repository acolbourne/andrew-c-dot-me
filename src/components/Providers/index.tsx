'use client';

import HolyLoader from 'holy-loader';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider, useTheme } from 'next-themes';
import type { JSX } from 'react';
import { FaviconLinks } from '@/components/FaviconLinks';

interface ProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

const ThemedHolyLoader = (): JSX.Element | null => {
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = theme === 'system' ? resolvedTheme : theme;

  if (!activeTheme) {
    return null;
  }

  const loaderGradient =
    activeTheme === 'dark'
      ? 'linear-gradient(to right, #22d3ee, #a855f7)'
      : 'linear-gradient(to right, #ff7e5f, #b224ef)';

  return (
    <HolyLoader
      color={loaderGradient}
      easing="linear"
      height="2px"
      key={activeTheme}
      showSpinner={false}
    />
  );
};

export default function Providers({ children, locale, messages }: ProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange={false}
      enableSystem={false}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <FaviconLinks />
        <ThemedHolyLoader />
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
