import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    RECAPTCHA_SECRET_KEY: z.string()
  },
  client: {
    NEXT_PUBLIC_CONTACT_FORM_ENDPOINT: z.string(),
    NEXT_PUBLIC_CONTACT_FORM_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string()
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CONTACT_FORM_ENDPOINT: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT,
    NEXT_PUBLIC_CONTACT_FORM_PUBLIC_KEY: process.env.NEXT_PUBLIC_CONTACT_FORM_PUBLIC_KEY,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY
  }
});
