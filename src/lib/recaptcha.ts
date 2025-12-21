// Adapted from https://www.buildwithmatija.com/blog/recaptcha-v3-nextjs-guide by Matija Žiberna.
import { env } from '@/env';
import type { RecaptchaResponse, RecaptchaVerify } from '@/types';

export async function verifyRecaptcha(token: string): Promise<RecaptchaVerify> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: JSON.stringify({
        secret: env.RECAPTCHA_SECRET_KEY,
        response: token
      })
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to verify reCAPTCHA token.'
      };
    }

    const data: RecaptchaResponse = await response.json();

    if (!data.success) {
      return {
        success: false,
        error:
          data['error-codes']?.join(', ') ?? 'reCAPTCHA verification failed: Unknown exception.'
      };
    }

    if (data.score && data.score < 0.5) {
      return {
        success: false,
        score: data.score,
        error: 'reCAPTCHA verification failed: Low confidence score.'
      };
    }

    if (data.action && data.action !== 'contact_form_submission') {
      return {
        success: false,
        error: 'reCAPTCHA verification failed: Invalid action.'
      };
    }

    return {
      success: true,
      score: data.score
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
