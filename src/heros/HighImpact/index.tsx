'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

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

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  const primaryButtonLink = links?.[0]?.link
  const secondaryButtonLink = links?.[1]?.link

  // Assuming an overlay is always desired for high-impact heroes for text readability.
  const overlay = true

  return (
    <section
      className="relative py-20 md:py-32 bg-cover bg-center min-h-screen flex items-center"
      style={!media ? { backgroundColor: '#1e40af' } : {}}
    >
      {media && typeof media === 'object' && (
        <>
          <div className="absolute inset-0 w-full h-full -z-10">
            <Media resource={media} fill imgClassName="object-cover" priority />
          </div>
          {overlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-black z-0"
            />
          )}
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center text-white"
        >
          {richText?.root?.children && (
            <motion.div variants={itemVariants}>
              <RichText data={richText} />
            </motion.div>
          )}

          <motion.div
            variants={buttonVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            {primaryButtonLink && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300"
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
                  className="text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <CMSLink {...secondaryButtonLink} />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/70"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  )
}
