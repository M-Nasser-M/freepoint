import type { Field } from 'payload'



import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
        {
      name: 'line1',
      type: 'text',
      label: 'Headline Part 1',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
        description: 'The first part of the main headline, before the highlighted word.',
      },
    },
    {
      name: 'highlightedWord',
      type: 'text',
      label: 'Highlighted Word',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
        description: 'The word in the headline to be specially styled (e.g., blue with a star).',
      },
    },
    {
      name: 'line2',
      type: 'text',
      label: 'Headline Part 2',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
        description: 'The part of the main headline after the highlighted word (optional).',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
        description: 'The paragraph of text below the main headline.',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
