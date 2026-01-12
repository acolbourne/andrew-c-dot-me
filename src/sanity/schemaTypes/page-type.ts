import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of this page. It should be descriptive and concise.',
      validation: (rule) =>
        rule.required().min(5).max(255).warning('The title should be between 5 and 255 characters.')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A unique identifier for the page which will appear in the URL.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required().warning('A slug is required. Slugs must be unique.')
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) =>
        rule.required().min(20).warning('A page must have at least 20 characters.')
    }),
    defineField({
      name: 'hideFromNav',
      title: 'Hide from Navigation',
      type: 'boolean',
      initialValue: false,
      description: 'If true, this page will not be shown in the navigation menu.'
    })
  ]
});
