import { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials-section',
  interfaceName: 'TestimonialsSectionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          admin: {
            description: 'Optional: Star rating from 1 to 5.',
            step: 1,
          },
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'text',
      admin: {
        description: 'Optional: Use Tailwind CSS color classes (e.g., bg-blue-600). Defaults to bg-blue-600 if not set.',
      },
    },
  ],
}
