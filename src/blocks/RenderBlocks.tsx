import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { AboutBlock } from '@/blocks/AboutBlock/Component'
import { BrandLogosBlock } from '@/blocks/BrandLogosBlock/Component'
import { CallToActionBlock as NewCallToActionBlock } from '@/blocks/CallToActionBlock/Component' // Renamed to avoid conflict
import { InsightsGridBlock } from '@/blocks/InsightsGridBlock/Component'
import { MapBlock } from '@/blocks/MapBlock/Component'
import { NewsletterBlock } from '@/blocks/NewsletterBlock/Component'
import { PageHeaderBlock } from '@/blocks/PageHeaderBlock/Component'
import { PortfolioGalleryBlock } from '@/blocks/PortfolioGalleryBlock/Component'
import { ServicesGridBlock } from '@/blocks/ServicesGridBlock/Component'
import { TestimonialsSectionBlock } from '@/blocks/TestimonialsSectionBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  about: AboutBlock,
  'brand-logos': BrandLogosBlock,
  'call-to-action-block': NewCallToActionBlock,
  'insights-grid': InsightsGridBlock,
  map: MapBlock,
  newsletter: NewsletterBlock,
  'page-header': PageHeaderBlock,
  'portfolio-gallery': PortfolioGalleryBlock,
  'services-grid': ServicesGridBlock,
  'testimonials-section': TestimonialsSectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
