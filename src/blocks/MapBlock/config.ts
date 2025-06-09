import { Block } from 'payload'

export const Map: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'mapEmbedUrl',
      label: 'Map Embed URL',
      type: 'text',
      required: true,
      admin: {
        description: 'Enter the full embed URL for the map (e.g., from Google Maps).',
      },
    },
    {
      name: 'height',
      type: 'text',
      defaultValue: '400px',
      admin: {
        description: 'Optional: Specify map height with units (e.g., 400px, 50vh). Defaults to 400px.',
      },
    },
  ],
}
