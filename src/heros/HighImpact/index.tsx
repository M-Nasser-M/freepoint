'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

type HighImpactHeroProps = Page['hero']

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
  links,
  media,
  line1,
  highlightedWord,
  line2,
  subheadline,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  const primaryButtonLink = links?.[0]?.link
  const secondaryButtonLink = links?.[1]?.link

  // Assuming an overlay is always desired for high-impact heroes for text readability.
  const overlay = true // Ensure text readability over the background media

  return (
    <>
      <style jsx global>{`
        .highlighted-word-star::after {
          content: '★';
          color: #facc15; /* Tailwind yellow-400 */
          margin-left: 0.25rem; /* Adjust as needed */
          font-size: 0.9em; /* Adjust size relative to text */
          vertical-align: super; /* Align star nicely */
        }
      `}</style>
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center py-24 md:py-32"
        style={!media ? { backgroundColor: '#0F172A' /* e.g., slate-900 */ } : {}}
      >
        {media && typeof media === 'object' && (
          <>
            <div className="absolute inset-0 w-full h-full -z-10">
              <Media resource={media} fill imgClassName="object-cover" priority />
            </div>
            {overlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-black z-0"
              />
            )}
          </>
        )}

        <div className="container mx-auto px-6 lg:px-8 relative z-10 flex flex-col justify-center items-center h-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl text-left text-white"
          >
            {(line1 || highlightedWord || line2) && (
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl md:text-7xl font-bold !leading-tight mb-6"
              >
                {line1}
                {line1 && highlightedWord && ' '}
                {highlightedWord && (
                  <span className="text-blue-400 highlighted-word-star">{highlightedWord}</span>
                )}
                {line2 && (highlightedWord || line1) && ' '}
                {line2}
              </motion.h1>
            )}
            {subheadline && (
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl opacity-90 mb-10"
              >
                {subheadline}
              </motion.p>
            )}

            <motion.div
              variants={buttonVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start mt-8"
            >
              {primaryButtonLink && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-yellow-400 text-black hover:bg-yellow-300 transition-colors duration-300 px-8 py-3 text-lg font-semibold rounded-lg shadow-md"
                  >
                    <CMSLink {...primaryButtonLink} />
                  </Button>
                </motion.div>
              )}
              {secondaryButtonLink && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-slate-700/50 text-white border border-slate-600 hover:bg-slate-600/70 transition-colors duration-300 px-8 py-3 text-lg font-semibold rounded-lg shadow-md backdrop-blur-sm"
                  >
                    <CMSLink {...secondaryButtonLink} />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
