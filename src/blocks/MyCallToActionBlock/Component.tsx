import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LinkType {
  text: string
  href: string
  id?: string
}

interface CallToActionBlockProps {
  title: string
  description: string
  ctaButtons?: LinkType[] // Array of individual buttons
  backgroundColor?: string
  centered?: boolean
}

export function MyCallToActionBlock({
  title,
  description,
  ctaButtons,
  backgroundColor = 'bg-gray-100',
  centered = true,
}: CallToActionBlockProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{title}</h2>

          {description && <p className="text-lg text-gray-600 mb-8">{description}</p>}

          {ctaButtons && ctaButtons.length > 0 && (
            <div className={`flex flex-col sm:flex-row gap-4 ${centered ? 'justify-center' : ''}`}>
              {ctaButtons.map((button, index) => (
                <Button key={button.id || `button-${index}`} size="lg" asChild>
                  {button.href ? <Link href={button.href}>{button.text}</Link> : button.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
