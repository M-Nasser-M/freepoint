import { Block } from 'payload'

export const BrandLogos: Block = {
  slug: 'brand-logos',
  interfaceName: 'BrandLogosBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media', // Assuming you have a 'media' collection for uploads
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'text',
      admin: {
        description: 'Optional: Use Tailwind CSS color classes (e.g., bg-gray-100). Defaults to bg-white if not set.',
      },
    },
  ],
}
