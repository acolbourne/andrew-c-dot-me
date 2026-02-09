'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const cookieApprovalVariants = tv({
  slots: {
    base: 'alert fixed right-4 bottom-0 left-4 z-50 mb-6 bg-white/70 px-6 py-4 shadow-lg backdrop-blur-sm sm:right-auto sm:left-1/2 sm:w-full sm:max-w-2xl sm:-translate-x-1/2 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white',
    content: 'flex flex-row items-center gap-3',
    message: 'min-w-0 flex-1',
    button:
      'btn btn-sm ml-auto shrink-0 rounded-lg border-none bg-accent-light font-bold text-white hover:bg-blue-700 dark:bg-accent-dark dark:text-slate-900 dark:hover:bg-blue-400'
  }
});

const { base, content, message, button } = cookieApprovalVariants();

const CookieApproval: React.FC = () => {
  const t = useTranslations('cookieApproval');
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'accepted');
      setShowModal(false);
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <div aria-label={t('description')} className={cn(base())} role="alert">
      <div className={cn(content())}>
        <div className={cn(message())}>
          <span>{t('description')}</span>
        </div>
        <button className={cn(button())} onClick={handleAccept} type="button">
          {t('accept')}
        </button>
      </div>
    </div>
  );
};

export default CookieApproval;
