import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of this post. It should be descriptive and concise.',
      validation: (rule) =>
        rule.required().min(5).max(255).warning('The title should be between 5 and 255 characters.')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A unique identifier for the post which will appear in the URL.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required().warning('A slug is required. Slugs must be unique.')
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().warning('A published date is required.')
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: 'The featured image for this post.',
      options: { hotspot: true }
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) =>
        rule.required().min(20).warning('A post must have at least 20 characters.')
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required().warning('A category is required for each post.')
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tags' }] }]
    })
  ]
});
