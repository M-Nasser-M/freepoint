import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface InsightItemPayload {
  id: string
  title: string
  excerpt?: string // Assuming excerpt might be optional or handled differently
  image?: string | { url?: string; alt?: string } // Payload media object or URL string
  slug: string
  category?: { title?: string /* other category fields */ } | string // Assuming category might be a relationship or text
  readTime?: string
  // Add other fields from your 'posts' collection that you want to use
}

interface InsightsGridBlockProps {
  title?: string // Added title from block config
  insights: InsightItemPayload[]
  columns?: '2' | '3' | '4' // Values from block config select
}

export function InsightsGridBlock({ title, insights, columns = '3' }: InsightsGridBlockProps) {
  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{title}</h2>}
        <div className={`grid grid-cols-1 ${gridCols[columns || '3']} gap-8`}>
          {insights?.map((insight) => {
            const imageUrl = typeof insight.image === 'string' ? insight.image : insight.image?.url
            const imageAlt =
              typeof insight.image === 'string'
                ? insight.title
                : insight.image?.alt || insight.title
            const insightUrl = `/posts/${insight.slug}` // Assuming a path structure

            return (
              <Link key={insight.id} href={insightUrl} passHref>
                <a className="block h-full">
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                    {imageUrl && (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{insight.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      {insight.excerpt && (
                        <CardDescription className="line-clamp-3 mb-2">
                          {insight.excerpt}
                        </CardDescription>
                      )}
                      {insight.readTime && (
                        <p className="text-xs text-gray-500 mt-auto pt-2">{insight.readTime}</p>
                      )}
                    </CardContent>
                  </Card>
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
