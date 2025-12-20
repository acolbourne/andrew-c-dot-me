const SinglePostSkeleton: React.FC = () => (
  <>
    <div className="mb-8">
      <div className="skeleton h-5 w-32" />
    </div>

    <article>
      <header className="mb-10 flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="skeleton h-4 w-24" />
            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <div className="skeleton h-4 w-32" />
          </div>

          <div className="skeleton h-12 w-full sm:h-16" />
        </div>
      </header>

      <div className="mb-10 overflow-hidden rounded-xl shadow-sm">
        <div className="skeleton h-96 w-full" />
      </div>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none space-y-4">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
      </div>

      <div className="mt-12 border-slate-200 border-t pt-8 dark:border-slate-800">
        <div className="flex flex-wrap gap-2">
          <div className="skeleton h-6 w-16 rounded" />
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-6 w-14 rounded" />
        </div>
      </div>

      <nav className="mt-12 flex justify-between gap-4">
        <div className="flex flex-col text-left text-sm">
          <div className="skeleton mb-1 h-4 w-24" />
          <div className="skeleton h-5 w-48" />
        </div>
        <div className="flex flex-col text-right text-sm">
          <div className="skeleton mb-1 h-4 w-20" />
          <div className="skeleton h-5 w-48" />
        </div>
      </nav>
    </article>
  </>
);

export default SinglePostSkeleton;
