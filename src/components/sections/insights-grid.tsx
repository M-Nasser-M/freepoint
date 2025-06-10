import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface InsightItem {
  id: string
  title: string
  excerpt: string
  image: string
  slug: string
  category?: string
  readTime?: string
}

interface InsightsGridProps {
  insights: InsightItem[]
  columns?: 2 | 3 | 4
}

export function InsightsGrid({ insights, columns = 3 }: InsightsGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {insights.map((insight) => (
            <Link key={insight.id} href={`/posts/${insight.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative aspect-video">
                  <Image
                    src={insight.image || '/placeholder.svg'}
                    alt={insight.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{insight.excerpt}</CardDescription>
                  {insight.readTime && (
                    <p className="text-xs text-gray-500 mt-4">{insight.readTime}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
