import type { SchemaTypeDefinition } from 'sanity';
import { categoryType } from './category-type';
import { pageType } from './page-type';
import { postType } from './post-type';
import { tagType } from './tag-type';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, postType, tagType, pageType]
};
