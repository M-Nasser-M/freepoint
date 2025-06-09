import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AboutSectionProps {
  title: string
  description: string
  stats?: Array<{
    number: string
    label: string
  }>
  ctaButton?: {
    text: string
    href: string
  }
  backgroundColor?: string
}

export function AboutSection({
  title,
  description,
  stats,
  ctaButton,
  backgroundColor = "bg-blue-600",
}: AboutSectionProps) {
  return (
    <section className={`py-16 ${backgroundColor} text-white`}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">{title}</h2>
            <p className="text-lg mb-8 opacity-90">{description}</p>
            {ctaButton && (
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                {ctaButton.text}
              </Button>
            )}
          </div>

          {stats && (
            <div className="flex justify-center">
              <Card className="bg-yellow-400 text-black p-8 rounded-full w-48 h-48 flex items-center justify-center">
                <CardContent className="text-center p-0">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-bold">{stat.number}</div>
                      <div className="text-sm">{stat.label}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
