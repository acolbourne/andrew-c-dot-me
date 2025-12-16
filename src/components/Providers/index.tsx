'use client';

import HolyLoader from 'holy-loader';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider, useTheme } from 'next-themes';
import type { JSX } from 'react';

type ProviderProps = {
  children: React.ReactNode;
  locale: string;
};

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

export default function Providers({ children, locale }: ProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextIntlClientProvider locale={locale}>
        <ThemedHolyLoader />
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
