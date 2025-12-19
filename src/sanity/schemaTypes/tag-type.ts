import { defineField, defineType } from 'sanity';

export const tagType = defineType({
  name: 'tags',
  title: 'Tags',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of this tag.',
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(25)
          .warning('Titles should be between 1 and 25 characters in length.')
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'A short description of the tag.',
      validation: (rule) =>
        rule
          .required()
          .min(10)
          .max(200)
          .warning('Descriptions should be between 10 and 200 characters in length.')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A unique identifier for the tag which will appear in the URL.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required().error('A slug is required.')
    })
  ]
});
