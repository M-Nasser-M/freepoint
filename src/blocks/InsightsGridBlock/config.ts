import { Block } from 'payload'

export const InsightsGrid: Block = {
  slug: 'insights-grid',
  interfaceName: 'InsightsGridBlock',
  fields: [
    {
      name: 'title',
      label: 'Section Title (Optional)',
      type: 'text',
    },
    {
      name: 'insights',
      label: 'Select Insights',
      type: 'relationship',
      relationTo: 'posts', // Assuming you have a 'posts' or 'articles' collection
      hasMany: true,
      required: true,
      admin: {
        description: 'Select the insight/blog posts to display in the grid.',
      },
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
  ],
}
