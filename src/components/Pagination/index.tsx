const Pagination: React.FC = () => (
  <div className="mt-20 flex items-center justify-center gap-1">
    <a
      className="cursor-not-allowed px-3 py-2 font-medium text-slate-500 text-sm dark:text-slate-400"
      href="/"
    >
      &larr; Prev
    </a>
    <a
      className="rounded-lg bg-accent-light px-4 py-2 font-bold text-sm text-white transition-colors hover:bg-opacity-90 dark:bg-accent-light"
      href="/"
    >
      1
    </a>
    <a
      className="rounded-lg px-4 py-2 font-medium text-slate-600 text-sm transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      href="/"
    >
      2
    </a>
    <a
      className="rounded-lg px-4 py-2 font-medium text-slate-600 text-sm transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      href="/"
    >
      3
    </a>
    <a
      className="px-3 py-2 font-medium text-slate-600 text-sm transition-colors hover:text-accent-light dark:text-slate-400 dark:hover:text-white"
      href="/"
    >
      Next &rarr;
    </a>
  </div>
);

export default Pagination;
