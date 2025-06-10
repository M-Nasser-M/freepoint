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
        description: 'The first part of the main headline, before the highlighted word.',
      },
    },
    {
      name: 'highlightedWord',
      type: 'text',
      label: 'Highlighted Word',
      admin: {
        description: 'The word in the headline to be specially styled (e.g., blue with a star).',
      },
    },
    {
      name: 'line2',
      type: 'text',
      label: 'Headline Part 2',
      admin: {
        description: 'The part of the main headline after the highlighted word (optional).',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
      admin: {
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
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
