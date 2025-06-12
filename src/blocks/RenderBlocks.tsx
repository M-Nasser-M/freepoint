import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { AboutBlock } from '@/blocks/AboutBlock/Component'
import { BrandLogosBlock } from '@/blocks/BrandLogosBlock/Component'
import { MyCallToActionBlock } from '@/blocks/MyCallToActionBlock/Component'
import { InsightsGridBlock } from '@/blocks/InsightsGridBlock/Component'
import { MapBlock } from '@/blocks/MapBlock/Component'
import { NewsletterBlock } from '@/blocks/NewsletterBlock/Component'
import { PageHeaderBlock } from '@/blocks/PageHeaderBlock/Component'
import { PortfolioGalleryBlock } from '@/blocks/PortfolioGalleryBlock/Component'
import { ServicesGridBlock } from '@/blocks/ServicesGridBlock/Component'
import { TestimonialsSectionBlock } from '@/blocks/TestimonialsSectionBlock/Component'

type blockName = Page['layout'][number]['blockType']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<blockName, React.FC<any>> = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  archive: ArchiveBlock,
  formBlock: FormBlock,
  about: AboutBlock,
  'brand-logos': BrandLogosBlock,
  'my-call-to-action-block': MyCallToActionBlock,
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
          if (blockType === "portfolio-gallery") {
            console.log(block);
          }
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
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
