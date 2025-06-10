'use client'

import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function Footer() {

  const companyInfo = {
    description: 'Modern, beautiful, and performant websites.',
    phone: '+1 234 567 890',
    email: 'hello@freepoint.com',
  }

  const socialLinks = [
    { platform: 'facebook', url: '#' },
    { platform: 'instagram', url: '#' },
    { platform: 'linkedin', url: '#' },
  ]

  const copyright = `© ${new Date().getFullYear()} Freepoint. All rights reserved.`

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="bg-gray-100 py-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-4"
            >
              <span className="text-white font-bold text-lg">FP</span>
            </motion.div>
            <p className="text-gray-600 mb-4">{companyInfo.description}</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4">Contact Info :</h3>
            <motion.p
              whileHover={{ x: 5 }}
              className="text-gray-600 mb-2 transition-transform duration-200"
            >
              {companyInfo.phone}
            </motion.p>
            <motion.p
              whileHover={{ x: 5 }}
              className="text-gray-600 mb-4 transition-transform duration-200"
            >
              {companyInfo.email}
            </motion.p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.platform}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={social.url}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                  >
                    {social.platform === 'facebook' && <Facebook size={20} />}
                    {social.platform === 'instagram' && <Instagram size={20} />}
                    {social.platform === 'linkedin' && <Linkedin size={20} />}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-200"
        >
          {copyright}
        </motion.div>
      </div>
    </motion.footer>
  )
}
