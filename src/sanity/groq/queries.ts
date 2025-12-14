import { defineQuery } from 'next-sanity';

export const POSTS_QUERY = defineQuery('*[_type == "post" && defined(slug.current)]');
