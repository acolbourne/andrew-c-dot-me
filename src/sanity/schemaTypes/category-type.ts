import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of this category. It should be descriptive and concise.',
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .max(100)
          .warning('Titles should be between 3 and 100 characters in length.')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'A unique identifier for the category which will appear in the URL.',
      validation: (rule) => rule.required().error('A slug is required. Slugs must be unique.')
    })
  ]
});
