'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { BrandLogosBlock } from '@/payload-types'
import { Marquee } from '@/components/magicui/marquee'

export function BrandLogosBlock({ logos, title }: BrandLogosBlock) {
  return (
    <section className="py-16 bg-white" >
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-center text-xl font-semibold mb-8 text-gray-800">
            {title}
          </h2>
        )}

        <Marquee pauseOnHover className="[--duration:15s]">
          {logos?.map((brand) => {
            const logoData = brand.logo;

            let logoSrc: string | null | undefined = null;
            let logoAlt: string = brand.name; // Default alt text to brand name

            if (typeof logoData === 'object' && logoData !== null) {
              // logoData is a Media object
              logoSrc = logoData.url;
              logoAlt = logoData.alt || brand.name; // Use media alt, or fallback to brand name
            }
            // If logoData is a number (ID), logoSrc remains null/undefined.
            // The existing `if (!logoSrc) return null;` will handle this.

            if (!logoSrc) return null

            const imageElement = (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={120} // You might want to adjust these dimensions
                height={60} // or make them more dynamic
                className="object-contain mx-4"
              />
            )

            return (
              <div
                key={brand.id || brand.name}
                className="flex items-center justify-center"
              >
                {brand.url ? (
                  <Link href={brand.url} target="_blank" rel="noopener noreferrer">
                    {imageElement}
                  </Link>
                ) : (
                  imageElement
                )}
              </div>
            )
          })}
        </Marquee>
      </div>
    </section>
  )
}
