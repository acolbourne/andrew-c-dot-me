import { captureRouterTransitionStart, init, replayIntegration } from '@sentry/nextjs';
import posthog from 'posthog-js';
import { env } from '@/env';

init({
  dsn: 'https://7023816ab8cd45bc0a87b0ec734b4c62@o4510574814167040.ingest.de.sentry.io/4510574814625872',
  integrations: [replayIntegration()],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true
});

posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2025-11-30',
  person_profiles: 'never',
  capture_pageview: true,
  capture_pageleave: true
});

export const onRouterTransitionStart = captureRouterTransitionStart;
