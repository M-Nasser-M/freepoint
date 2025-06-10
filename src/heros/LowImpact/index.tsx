import React from 'react'
import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'

type LowImpactHeroProps = Extract<Page['hero'], { type: 'lowImpact' }>

export const LowImpactHero: React.FC<LowImpactHeroProps> = ({ line1, media }) => {
  return (
    <section className="relative w-full h-64 md:h-80 bg-black flex items-center justify-center text-center my-12 md:my-20">
      {media && typeof media === 'object' && (
        <>
          <div className="absolute inset-0 w-full h-full -z-10">
            <Media resource={media} fill imgClassName="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-black/60 z-0" />
        </>
      )}

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {line1 && (
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 uppercase">
            {line1}
          </h1>
        )}
      </div>
    </section>
  )
}
