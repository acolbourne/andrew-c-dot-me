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

export const CATEGORY_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $categorySlug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    "postCount": count(*[_type == "post" && category->slug.current == $categorySlug && defined(slug.current)]),
    "posts": *[_type == "post" 
      && category->slug.current == $categorySlug
      && defined(slug.current)
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
  }
`);

export const TAG_QUERY = defineQuery(`
  *[_type == "tags" && slug.current == $tagSlug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    "postCount": count(*[_type == "post" && $tagSlug in tags[]->slug.current && defined(slug.current)]),
    "posts": *[_type == "post" 
      && $tagSlug in tags[]->slug.current
      && defined(slug.current)
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
  }
`);

export const ARCHIVE_QUERY = defineQuery(`
  {
    "postCount": count(*[_type == "post" && defined(slug.current)]),
    "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [$start...$end] {
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
  }
`);

export const SINGLE_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $postSlug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    image,
    body,
    "category": {
      "title": category->title,
      "slug": category->slug.current
    },
    "tags": tags[]->{
      "title": title,
      "slug": slug.current
    }
  }
`);

export const ADJACENT_POSTS_QUERY = defineQuery(`
  {
    "previous": *[_type == "post" 
      && defined(slug.current)
      && publishedAt > $publishedAt
    ] | order(publishedAt asc) [0] {
      title,
      "slug": slug.current
    },
    "next": *[_type == "post" 
      && defined(slug.current)
      && publishedAt < $publishedAt
    ] | order(publishedAt desc) [0] {
      title,
      "slug": slug.current
    }
  }
`);
