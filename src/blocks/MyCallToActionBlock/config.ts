import { Block } from 'payload'

export const MyCallToActionBlock: Block = {
  slug: 'my-call-to-action-block',
  interfaceName: 'MyCallToActionBlock',
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
      name: 'ctaButtons',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: 'button',
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
      name: 'backgroundColor',
      type: 'text',
      admin: {
        description:
          'Optional: Use Tailwind CSS color classes (e.g., bg-gray-100). Defaults to bg-gray-100 if not set.',
      },
    },
    {
      name: 'centered',
      type: 'checkbox',
      defaultValue: true,
      label: 'Center Align Content',
    },
  ],
}
