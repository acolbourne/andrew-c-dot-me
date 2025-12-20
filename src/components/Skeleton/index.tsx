const PostListingSkeleton: React.FC = () => (
  <article className="blog-post-listing">
    <div className="skeleton h-56 w-full rounded-xl" />

    <div className="flex flex-col">
      <div className="mb-2">
        <div className="skeleton h-4 w-24" />
      </div>

      <div className="mb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <div className="skeleton h-8 w-3/4 sm:w-2/3" />
        <div className="mt-1 shrink-0 sm:mt-0">
          <div className="skeleton h-5 w-32" />
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="skeleton h-6 w-16 rounded" />
        <div className="skeleton h-6 w-20 rounded" />
        <div className="skeleton h-6 w-14 rounded" />
      </div>
    </div>
  </article>
);

export default PostListingSkeleton;
