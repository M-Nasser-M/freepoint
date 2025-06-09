import { Block } from 'payload'

export const PageHeader: Block = {
  slug: 'page-header',
  interfaceName: 'PageHeaderBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media', // Assuming you have a 'media' collection
      label: 'Background Image (Optional)',
      admin: {
        description: 'Optional background image for the header section.',
      },
    },
  ],
}
