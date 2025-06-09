import { Block } from 'payload'

export const PortfolioGallery: Block = {
  slug: 'portfolio-gallery',
  interfaceName: 'PortfolioGalleryBlock',
  fields: [
    {
      name: 'title',
      label: 'Section Title (Optional)',
      type: 'text',
    },
    {
      name: 'items',
      label: 'Portfolio Items',
      type: 'relationship',
      relationTo: 'portfolioItems', // Assuming a 'portfolioItems' collection
      hasMany: true,
      required: true,
      admin: {
        description: 'Select the portfolio items to display.',
      },
    },
    {
      name: 'categories',
      label: 'Filter Categories (Optional)',
      type: 'array',
      admin: {
        description:
          'Define categories for filtering. Ensure these match categories in your portfolio items.',
      },
      fields: [
        {
          name: 'categoryName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      label: 'Show Category Filters',
      defaultValue: true,
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
