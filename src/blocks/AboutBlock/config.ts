import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'number',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },

    linkGroup({
      overrides: {
        maxRows: 1,
      },
    }),
  ],
}
