import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import type { BlogPostListingProps } from '@/types';

const BlogPostListing: React.FC<BlogPostListingProps> = ({
  title,
  slug,
  publishedAt,
  image,
  category,
  tags,
  excerpt
}) => {
  const imageUrl = image ? urlFor(image).width(800).height(560).url() : '/images/demo.jpg';
  const formattedDate = new Date(publishedAt ?? new Date()).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const hasTags = tags && Array.isArray(tags) && tags.length > 0;
  const truncatedExcerpt =
    excerpt && excerpt.length > 150 ? `${excerpt.substring(0, 150)}...` : excerpt;

  return (
    <article className="group blog-post-listing">
      <Link className="block overflow-hidden rounded-xl shadow-sm" href={`/posts/${slug}`}>
        <Image
          alt={title ?? ''}
          className="h-56 w-full transform object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          height={560}
          src={imageUrl}
          width={800}
        />
      </Link>
      <div className="flex flex-col">
        {category ? (
          <div className="mb-2">
            <span className="font-bold text-accent-light text-xs uppercase tracking-wider dark:text-accent-dark">
              <Link href={`/categories/${category.slug}`}>{category.title}</Link>
            </span>
          </div>
        ) : null}
        <div className="mb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-bold text-2xl text-slate-900 transition-colors group-hover:text-accent-light dark:text-white dark:group-hover:text-accent-dark">
            <Link href={`/posts/${slug}`}>{title}</Link>
          </h3>
          <time className="mt-1 shrink-0 font-medium text-slate-500 text-sm sm:mt-0 dark:text-slate-400">
            {formattedDate}
          </time>
        </div>
        {truncatedExcerpt ? (
          <p className="mb-4 text-slate-700 leading-relaxed dark:text-slate-300">
            {truncatedExcerpt}
          </p>
        ) : null}
        {hasTags ? (
          <div className="flex flex-wrap gap-2 font-semibold text-xs">
            {tags.map((tag) => (
              <Link
                className="rounded bg-slate-100 px-2.5 py-1 text-slate-700 transition-colors hover:bg-accent-light hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-accent-dark dark:hover:text-slate-900"
                href={`/tags/${tag.slug}`}
                key={tag.slug}
              >
                #{tag.title}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default BlogPostListing;
