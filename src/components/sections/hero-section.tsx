'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  overlay?: boolean
}

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

export function HeroSection({
  title,
  subtitle,
  description,
  backgroundImage,
  primaryButton,
  secondaryButton,
  overlay = true,
}: HeroSectionProps) {
  return (
    <section
      className="relative py-20 md:py-32 bg-cover bg-center min-h-screen flex items-center"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : { backgroundColor: '#1e40af' }
      }
    >
      {overlay && backgroundImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black"
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-4">
            {title}
          </motion.h1>

          {subtitle && (
            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl mb-6 text-yellow-400">
              {subtitle}
            </motion.h2>
          )}

          {description && (
            <motion.p variants={itemVariants} className="text-lg md:text-xl mb-8 opacity-90">
              {description}
            </motion.p>
          )}

          <motion.div
            variants={buttonVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {primaryButton && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300"
                >
                  {primaryButton.text}
                </Button>
              </motion.div>
            )}
            {secondaryButton && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black border-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  {secondaryButton.text}
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white/70"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  )
}
