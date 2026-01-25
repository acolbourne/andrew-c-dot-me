import Image from 'next/image';
import Link from 'next/link';
import { tv } from 'tailwind-variants';
import { urlFor } from '@/sanity/lib/image';
import type { BlogPostListingProps } from '@/types';

const blogPostListingVariants = tv({
  slots: {
    base: 'group blog-post-listing',
    featuredImageLink: 'block overflow-hidden rounded-xl shadow-sm',
    featuredImage:
      'h-56 w-full transform object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105',
    content: 'flex flex-col',
    categoryOuter: 'mb-2',
    categoryInner:
      'font-bold text-accent-light text-xs uppercase tracking-wider dark:text-accent-dark',
    listing: 'mb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between',
    postTitle:
      'font-bold text-2xl text-slate-900 transition-colors group-hover:text-accent-light dark:text-white dark:group-hover:text-accent-dark',
    postDate: 'mt-1 shrink-0 font-medium text-slate-500 text-sm sm:mt-0 dark:text-slate-400',
    postExcerpt: 'mb-4 text-slate-700 leading-relaxed dark:text-slate-300',
    postTags: 'flex flex-wrap gap-2 font-semibold text-xs',
    postTagLink:
      'rounded bg-slate-100 px-2.5 py-1 text-slate-700 transition-colors hover:bg-accent-light hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-accent-dark dark:hover:text-slate-900'
  }
});

const {
  base,
  featuredImageLink,
  featuredImage,
  content,
  categoryOuter,
  categoryInner,
  listing,
  postTitle,
  postDate,
  postExcerpt,
  postTags,
  postTagLink
} = blogPostListingVariants();

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
    <article className={base()}>
      <Link className={featuredImageLink()} href={`/posts/${slug}`}>
        <Image
          alt={title ?? ''}
          className={featuredImage()}
          height={560}
          src={imageUrl}
          width={800}
        />
      </Link>
      <div className={content()}>
        {category ? (
          <div className={categoryOuter()}>
            <span className={categoryInner()}>
              <Link href={`/categories/${category.slug}`}>{category.title}</Link>
            </span>
          </div>
        ) : null}
        <div className={listing()}>
          <h3 className={postTitle()}>
            <Link href={`/posts/${slug}`}>{title}</Link>
          </h3>
          <time className={postDate()}>{formattedDate}</time>
        </div>
        {truncatedExcerpt ? <p className={postExcerpt()}>{truncatedExcerpt}</p> : null}
        {hasTags ? (
          <div className={postTags()}>
            {tags.map((tag) => (
              <Link className={postTagLink()} href={`/tags/${tag.slug}`} key={tag.slug}>
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
