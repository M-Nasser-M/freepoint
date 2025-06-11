import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container py-12">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="max-w-3xl flex items-center">
          {richText && <RichText className="uppercase text-xl font-semibold text-gray-900 mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {(links || []).map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md transition-colors whitespace-nowrap"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
