import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

const PortfolioItems: CollectionConfig = {
  slug: 'portfolioItems',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  access: {
    read: () => true, // Everyone can read Portfolio Items
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'Category for filtering (e.g., Web Design, Branding).',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Make sure you have a 'media' collection
      required: true,
      label: 'Featured Image',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Item Description (Optional)',
    },
    // You could add more fields here like client name, project date, URL, etc.
  ],
}

export default PortfolioItems
