import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { PaginationProps } from '@/types';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
  const t = useTranslations('pagination');

  if (totalPages <= 1) {
    return null;
  }

  const getPageUrl = (page: number) => {
    const separator = basePath.includes('?') ? '&' : '?';
    return `${basePath}${separator}page=${page}`;
  };

  return (
    <div className="mt-20 flex items-center justify-center gap-1">
      {currentPage > 1 ? (
        <Link
          className="px-3 py-2 font-medium text-slate-600 text-sm transition-colors hover:text-accent-light dark:text-slate-400 dark:hover:text-white"
          href={getPageUrl(currentPage - 1)}
        >
          &larr; {t('previous')}
        </Link>
      ) : null}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Link
          className={
            pageNum === currentPage
              ? 'rounded-lg bg-accent-light px-4 py-2 font-bold text-sm text-white transition-colors hover:bg-opacity-90 dark:bg-accent-light'
              : 'rounded-lg px-4 py-2 font-medium text-slate-600 text-sm transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
          }
          href={getPageUrl(pageNum)}
          key={pageNum}
        >
          {pageNum}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          className="px-3 py-2 font-medium text-slate-600 text-sm transition-colors hover:text-accent-light dark:text-slate-400 dark:hover:text-white"
          href={getPageUrl(currentPage + 1)}
        >
          {t('next')} &rarr;
        </Link>
      ) : null}
    </div>
  );
};

export default Pagination;
