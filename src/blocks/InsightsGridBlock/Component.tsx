import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { InsightsGridBlock, Post, Media } from '@/payload-types'

type PostType = Post & {
  // image property removed as it's accessed from insight.meta.image
  excerpt?: string
  readTime?: string
  slug?: string // slug is part of Post, kept for consistency if intended
}

export function InsightsGridBlock({ title, insights, columns = '3' }: InsightsGridBlock) {
  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }

  // Return null if insights is not an array or is empty
  if (!Array.isArray(insights) || insights.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{title}</h2>}
        <div className={`grid grid-cols-1 ${gridCols[columns || '3']} gap-8`}>
          {insights.map((insightItem) => {
            // Skip if the insight is just a number reference
            if (typeof insightItem === "number") {
              return null
            }

            // Cast to our PostType
            const insight = insightItem as PostType

            // Access image from meta property based on console log
            const imageFromMeta = insight.meta?.image; // This can be 'number | Media | null | undefined'

            let imageUrl: string | undefined | null = undefined;
            // Default alt to title, can be overridden by image.alt if present
            let imageAlt: string | undefined | null = insight.title;

            // Check if imageFromMeta is a Media object (i.e., not a number and not null/undefined)
            if (imageFromMeta && typeof imageFromMeta !== 'number') {
              const mediaImage = imageFromMeta as Media; // Now we can safely cast to Media
              imageUrl = mediaImage.url;
              // Use mediaImage.alt if it's a non-empty string, otherwise insight.title is already set as default
              if (mediaImage.alt && typeof mediaImage.alt === 'string') {
                imageAlt = mediaImage.alt;
              }
            }
            // Note: if imageFromMeta is a number (ID) or null/undefined, imageUrl will remain undefined.
            const insightUrl = `/posts/${insight.slug}` // Assuming a path structure

            return (
              <Link key={insight.id} href={insightUrl} passHref>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                  {imageUrl && (
                    <div className="relative aspect-video w-full">
                      <Image
                        src={imageUrl}
                        alt={imageAlt || ''}
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
              </Link>
            )
          }).filter(Boolean)}
        </div>
      </div>
    </section>
  )
}
