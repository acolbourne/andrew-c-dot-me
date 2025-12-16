'use client';

import HolyLoader from 'holy-loader';
import { ThemeProvider, useTheme } from 'next-themes';
import type { JSX } from 'react';

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

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      enableSystem={false}
    >
      <ThemedHolyLoader />
      {children}
    </ThemeProvider>
  );
}
