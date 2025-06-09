import { Block } from 'payload'

export const ServicesGrid: Block = {
  slug: 'services-grid',
  interfaceName: 'ServicesGridBlock',
  fields: [
    {
      name: 'title',
      label: 'Section Title (Optional)',
      type: 'text',
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Optional: Icon name (e.g., from an icon library) or path to an SVG.',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features / Bullet Points (Optional)',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'text',
      admin: {
        description: 'Optional: Use Tailwind CSS color classes (e.g., bg-gray-100). Defaults to bg-yellow-50 if not set.',
      },
    },
  ],
}
