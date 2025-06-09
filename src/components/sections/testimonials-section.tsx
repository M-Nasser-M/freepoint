'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface Testimonial {
  id: string
  quote: string
  author: string
  company?: string
  rating?: number
}

interface TestimonialsSectionProps {
  title: string
  testimonials: Testimonial[]
  backgroundColor?: string
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
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const starVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
}

export function TestimonialsSection({
  title,
  testimonials,
  backgroundColor = 'bg-blue-600',
}: TestimonialsSectionProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mr-4">{title}</h2>
          <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
            <Star className="text-yellow-400 fill-current" size={32} />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="bg-white h-full">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {testimonial.rating && (
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            variants={starVariants}
                          >
                            <Star className="text-yellow-400 fill-current" size={16} />
                          </motion.div>
                        ))}
                      </div>
                    )}
                    <motion.blockquote
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-gray-700 italic"
                    >
                      &quot;{testimonial.quote}&quot;
                    </motion.blockquote>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-right"
                  >
                    <cite className="font-semibold text-gray-800">{testimonial.author}</cite>
                    {testimonial.company && (
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
