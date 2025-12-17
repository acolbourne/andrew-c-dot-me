import { getRequestConfig } from 'next-intl/server';
import { defaultLocale as locale } from '@/constants';

export default getRequestConfig(async () => ({
  locale,
  timeZone: 'Europe/London',
  messages: (await import(`@/language/${locale}.json`)).default
}));
