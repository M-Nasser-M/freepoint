import { Block } from 'payload'

export const Newsletter: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
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
      name: 'placeholder',
      label: 'Input Placeholder Text',
      type: 'text',
      defaultValue: 'Enter your email',
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      defaultValue: 'Subscribe',
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
