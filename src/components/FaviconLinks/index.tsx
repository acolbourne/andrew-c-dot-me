'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { iconPaths } from '@/constants/icons';

const getThemeIcons = (isDark: boolean) => {
  const suffix = isDark ? 'Dark' : 'Light';
  return {
    favicon16: iconPaths[`favicon16${suffix}` as keyof typeof iconPaths],
    favicon32: iconPaths[`favicon32${suffix}` as keyof typeof iconPaths],
    android192: iconPaths[`androidIcon192${suffix}` as keyof typeof iconPaths],
    android512: iconPaths[`androidIcon512${suffix}` as keyof typeof iconPaths],
    favicon: iconPaths[`favicon${suffix}` as keyof typeof iconPaths],
    apple: iconPaths[`appleTouchIcon${suffix}` as keyof typeof iconPaths]
  };
};

const removeExistingFavicons = (head: HTMLHeadElement) => {
  const existingLinks = head.querySelectorAll(
    'link[rel*="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
  );
  for (const link of existingLinks) {
    if (link.getAttribute('data-theme-aware') === 'true') {
      link.remove();
    }
  }
};

const createLink = (head: HTMLHeadElement, rel: string, href: string, sizes?: string) => {
  const link = document.createElement('link');
  link.setAttribute('rel', rel);
  link.setAttribute('href', href);
  link.setAttribute('data-theme-aware', 'true');
  if (sizes) {
    link.setAttribute('sizes', sizes);
  }
  head.appendChild(link);
};

const updateFavicon = (theme: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  const head = document.head;
  removeExistingFavicons(head);

  const isDark = theme === 'dark';
  const icons = getThemeIcons(isDark);

  const iconConfig = [
    { rel: 'icon', href: icons.favicon16, sizes: '16x16' },
    { rel: 'icon', href: icons.favicon32, sizes: '32x32' },
    { rel: 'icon', href: icons.android192, sizes: '192x192' },
    { rel: 'icon', href: icons.android512, sizes: '512x512' },
    { rel: 'icon', href: icons.favicon },
    { rel: 'shortcut icon', href: icons.favicon },
    { rel: 'apple-touch-icon', href: icons.apple }
  ];

  for (const config of iconConfig) {
    if (config.href) {
      createLink(head, config.rel, config.href, config.sizes);
    }
  }
};

export const FaviconLinks = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }
    const currentTheme =
      theme || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    updateFavicon(currentTheme);
  }, [theme, pathname]);

  return null;
};
