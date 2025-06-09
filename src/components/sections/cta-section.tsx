import { Button } from "@/components/ui/button"

interface CTASectionProps {
  title: string
  description?: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  backgroundColor?: string
  centered?: boolean
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  backgroundColor = "bg-gray-100",
  centered = true,
}: CTASectionProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl ${centered ? "mx-auto text-center" : ""}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{title}</h2>

          {description && <p className="text-lg text-gray-600 mb-8">{description}</p>}

          <div className={`flex flex-col sm:flex-row gap-4 ${centered ? "justify-center" : ""}`}>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
              {primaryButton.text}
            </Button>
            {secondaryButton && (
              <Button size="lg" variant="outline">
                {secondaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
