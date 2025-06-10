'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

interface TestimonialItem {
  id: string
  quote: string // Rich text or plain text
  author: string
  company?: string
  rating?: number // Number field in CMS, 1-5
  authorImage?: string | { url?: string; alt?: string; filename?: string } // Optional author image
}

interface TestimonialsSectionBlockProps {
  title: string
  testimonials: TestimonialItem[]
  backgroundColor?: string // e.g., 'bg-blue-600', 'bg-gray-100'
  textColor?: string // e.g., 'text-white', 'text-gray-800'
  accentColor?: string // e.g., 'text-yellow-400', 'text-blue-500'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const starVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05, // Faster animation for stars
      duration: 0.25,
      ease: 'easeOut',
    },
  }),
}

export function TestimonialsSectionBlock({
  title,
  testimonials = [],
  backgroundColor = 'bg-blue-600',
  textColor = 'text-black',
  accentColor = 'text-yellow-400',
}: TestimonialsSectionBlockProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${accentColor} mb-4`}>{title}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                transition: { duration: 0.25 },
              }}
              className="h-full"
            >
              <Card
                className={`h-full flex flex-col ${backgroundColor === 'bg-blue-600' || backgroundColor === 'bg-slate-800' ? 'bg-white/10' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}
              >
                <CardContent className={`p-6 flex flex-col flex-grow ${textColor}`}>
                  {testimonial.rating && testimonial.rating > 0 && (
                    <div className="flex mb-3">
                      {[...Array(Math.min(Math.max(testimonial.rating, 0), 5))].map((_, i) => (
                        <motion.div
                          key={i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={starVariants}
                        >
                          <Star className={`w-5 h-5 ${accentColor} fill-current`} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                  <Quote className={`w-8 h-8 ${accentColor} mb-3 opacity-50`} />
                  {/* Assuming quote is plain text. If rich text, use a serializer here */}
                  <p className="text-base italic mb-5 flex-grow leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-500/30">
                    <p className="font-semibold text-md">{testimonial.author}</p>
                    {testimonial.company && (
                      <p className={`text-sm opacity-80`}>{testimonial.company}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
