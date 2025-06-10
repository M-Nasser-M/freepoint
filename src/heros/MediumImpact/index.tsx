import React from 'react'
import type { Page } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type MediumImpactHeroProps = Omit<
  Extract<Page['hero'], { type: 'mediumImpact' }>,
  'links' | 'subheadline'
> & {
  links?: {
    link: {
      type?: ('reference' | 'custom') | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages'
        value: string | Page
      } | null
      url?: string | null
      label: string
      appearance?: ('default' | 'secondary' | 'link' | 'outline' | 'inline' | 'destructive' | 'ghost') | null
      icon?: string | null
    }
    id?: string | null
  }[] | null
  subheadline?: string | null
}

export const MediumImpactHero: React.FC<MediumImpactHeroProps> = ({
  links,
  media,
  line1,
  subheadline,
  layout,
}) => {
  const primaryButtonLink = links?.[0]?.link

  // For now, we only have one layout, but this structure allows for more.
  if (layout === 'textOnLeft') {
    return (
      <section className="container mx-auto my-12 md:my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-lg">
          {/* Left Column: Text Content */}
          <div className="bg-blue-600 text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center order-last md:order-first">
            {line1 && (
              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 uppercase mb-6">
                {line1}
              </h1>
            )}
            {subheadline && (
              <div
                className="prose prose-invert max-w-none text-lg space-y-4"
                dangerouslySetInnerHTML={{ __html: subheadline.replace(/\n/g, '<br />') }}
              />
            )}
            {primaryButtonLink && (
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-yellow-400 text-black hover:bg-yellow-300 transition-colors duration-300 px-8 py-3 text-lg font-semibold rounded-md"
                >
                  <CMSLink {...primaryButtonLink} />
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Image */}
          <div className="relative min-h-[300px] md:min-h-full">
            {media && typeof media === 'object' && (
              <Media resource={media} fill imgClassName="object-cover" priority />
            )}
          </div>
        </div>
      </section>
    )
  }

  return null // or a default layout
}
