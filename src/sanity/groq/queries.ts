import { defineQuery } from 'next-sanity';

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" 
    && defined(slug.current)
    && ($categorySlug == null || category->slug.current == $categorySlug)
    && ($tagSlug == null || $tagSlug in tags[]->slug.current)
  ] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    image,
    "category": {
      "title": category->title,
      "slug": category->slug.current
    },
    "tags": tags[]->{
      "title": title,
      "slug": slug.current
    },
    "excerpt": pt::text(body)
  }
`);
