import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (Optional)',
    },
    {
      name: 'ctaButtons',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: 'ctaButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'overlay',
      type: 'checkbox',
      label: 'Add Dark Overlay to Background Image',
      defaultValue: true,
    },
  ],
}
