'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { CircleCheckBig, CircleX, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { env } from '@/env';
import { tryCatch } from '@/lib/try-catch';
import { ContactFormSchema } from '@/schemas';
import type { ContactFormResult, RecaptchaWindow } from '@/types';
import Alert from '../Alert';
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';

export const ContactForm: React.FC = () => {
  const t = useTranslations('contactForm');
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [formResult, setFormResult] = useState<ContactFormResult>({ data: null, error: null });
  const [recaptchaReady, setRecaptchaReady] = useState<boolean>(false);

  const theContactForm = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const win = window as RecaptchaWindow;
      if (win.grecaptcha) {
        win.grecaptcha.ready(() => {
          setRecaptchaReady(true);
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src*="recaptcha/api.js"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const submitHandler = async (submission: z.infer<typeof ContactFormSchema>) => {
    setDisableSubmit(true);

    const win = window as RecaptchaWindow;
    let recaptchaToken = '';

    if (recaptchaReady && win.grecaptcha) {
      try {
        recaptchaToken = await win.grecaptcha.execute(env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
          action: 'contact_form_submission'
        });
      } catch (recaptchaError) {
        setFormResult({
          data: null,
          error:
            recaptchaError instanceof Error
              ? recaptchaError
              : new Error('Failed to execute reCAPTCHA')
        });
        setDisableSubmit(false);
        return;
      }
    }

    const { data, error } = await tryCatch(
      fetch(env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: DOMPurify.sanitize(submission.name),
          email: DOMPurify.sanitize(submission.email),
          message: DOMPurify.sanitize(submission.message),
          subject: t('subject'),
          access_key: env.NEXT_PUBLIC_CONTACT_FORM_PUBLIC_KEY,
          recaptcha_token: recaptchaToken
        })
      })
    );

    setFormResult({ data, error });
    setDisableSubmit(false);
  };

  return (
    <>
      {formResult?.data !== null && (
        <Alert icon={<CircleCheckBig />} message={t('success')} type="success" />
      )}
      {formResult?.error !== null && <Alert icon={<CircleX />} message={t('error')} type="error" />}

      <Form {...theContactForm}>
        <form className="flex flex-col gap-5" onSubmit={theContactForm.handleSubmit(submitHandler)}>
          <p hidden>
            <input name="bot-zapper" onChange={() => setDisableSubmit(true)} type="text" value="" />
          </p>

          <FormField
            control={theContactForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="form-control w-full">
                <FormLabel className="label pt-0 pb-1" htmlFor="name">
                  <span className="label-text font-bold text-slate-700 dark:text-slate-300">
                    {t('name')}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="input input-bordered w-full rounded-lg border-slate-300 bg-slate-50 text-slate-900 transition-all focus:border-accent-light focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-accent-dark"
                    id="name"
                    placeholder={t('namePlaceholder')}
                    type="text"
                    {...field}
                  />
                </FormControl>
                {!!theContactForm.formState.errors.name && (
                  <FormDescription className="mb-2 text-red-500 text-sm">
                    {theContactForm.formState.errors.name.message}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={theContactForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-control w-full">
                <FormLabel className="label pt-0 pb-1" htmlFor="email">
                  <span className="label-text font-bold text-slate-700 dark:text-slate-300">
                    {t('email')}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="input input-bordered w-full rounded-lg border-slate-300 bg-slate-50 text-slate-900 transition-all focus:border-accent-light focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-accent-dark"
                    id="email"
                    placeholder={t('emailPlaceholder')}
                    type="email"
                    {...field}
                  />
                </FormControl>
                {!!theContactForm.formState.errors.email && (
                  <FormDescription className="mb-2 text-red-500 text-sm">
                    {theContactForm.formState.errors.email.message}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={theContactForm.control}
            name="message"
            render={({ field }) => (
              <FormItem className="form-control w-full">
                <FormLabel className="label pt-0 pb-1" htmlFor="message">
                  <span className="label-text font-bold text-slate-700 dark:text-slate-300">
                    {t('message')}
                  </span>
                </FormLabel>
                <FormControl>
                  <textarea
                    className="textarea textarea-bordered h-40 w-full rounded-lg border-slate-300 bg-slate-50 text-base text-slate-900 transition-all focus:border-accent-light focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-accent-dark"
                    id="message"
                    placeholder={t('messagePlaceholder')}
                    {...field}
                  />
                </FormControl>
                {!!theContactForm.formState.errors.message && (
                  <FormDescription className="mb-2 text-red-500 text-sm">
                    {theContactForm.formState.errors.message.message}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <Button
            className="btn btn-block mt-6 h-12 rounded-lg border-none bg-accent-light font-bold text-base text-white normal-case hover:bg-blue-700 dark:bg-accent-dark dark:text-slate-900 dark:hover:bg-blue-400"
            disabled={disableSubmit}
            type="submit"
          >
            {disableSubmit === false ? t('submit') : <LoaderCircle />}
          </Button>
        </form>
      </Form>
    </>
  );
};
