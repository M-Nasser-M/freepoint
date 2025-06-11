'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface NewsletterBlockProps {
  title: string
  description: string
  placeholder?: string
  buttonText?: string
  backgroundColor?: string
}

export function NewsletterBlock({
  title,
  description,
  placeholder = 'Email',
  buttonText = 'Subscribe',
  backgroundColor = 'bg-blue-600',
}: NewsletterBlockProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    // Simulate API call
    console.log('Subscribing with:', email)
    // Replace with your actual newsletter subscription logic
    // try {
    //   const response = await fetch('/api/subscribe-newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    //   });
    //   if (!response.ok) throw new Error('Subscription failed');
    //   setIsSubscribed(true);
    //   setEmail("");
    //   setTimeout(() => setIsSubscribed(false), 3000);
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    // }

    // Mock success
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail('')
    }, 3000)
  }

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-black"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold mr-4"
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              animate={{ x: [0, 10, 0] }}
              // Removed whileInView from animate to make it loop correctly with framer-motion defaults
              // transition prop on motion.div for animation, not on animate directly
            >
              <ArrowRight className="text-yellow-400" size={32} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg mb-8 opacity-90"
          >
            {description}
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <motion.div whileFocus={{ scale: 1.02 }} className="flex-1">
              <Input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-black transition-all duration-300 focus:ring-2 focus:ring-yellow-400"
                required
                aria-label="Email for newsletter"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="bg-yellow-400 text-black hover:bg-yellow-500 whitespace-nowrap transition-all duration-300 relative overflow-hidden w-full sm:w-auto"
              >
                <motion.span
                  animate={isSubscribed ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {buttonText}
                </motion.span>
                <motion.span
                  initial={{ y: 30, opacity: 0 }}
                  animate={isSubscribed ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  Subscribed!
                </motion.span>
              </Button>
            </motion.div>
          </motion.form>
          {error && <p className="text-red-300 mt-4">{error}</p>}
        </motion.div>
      </div>
    </section>
  )
}
