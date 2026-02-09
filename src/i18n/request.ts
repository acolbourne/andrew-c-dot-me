import { getRequestConfig } from 'next-intl/server';
import { defaultLocale as locale, defaultTimezone as timezone } from '@/constants';

export default getRequestConfig(async () => ({
  locale,
  timeZone: timezone,
  messages: (await import(`@/language/${locale}.json`)).default
}));
