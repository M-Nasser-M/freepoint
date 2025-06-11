'use client'

import { Facebook, Instagram, Linkedin, Phone, Mail } from 'lucide-react'
import { RiTiktokLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

interface FooterClientProps {
  data: FooterType
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function FooterClient({ data }: FooterClientProps) {
  const { companyInfo, socialLinks, navItems, logo } = data || {}
  // Use the static copyright text from the image
  const copyrightText = `© ${new Date().getFullYear()} Freepoint. All rights reserved.`

  const renderSocialIcon = (platform: string) => {
    // Adjusted size for social icons
    if (platform.toLowerCase() === 'facebook') return <Facebook size={18} />
    if (platform.toLowerCase() === 'instagram') return <Instagram size={18} />
    if (platform.toLowerCase() === 'linkedin') return <Linkedin size={18} />
    if (platform.toLowerCase() === 'tiktok') return <RiTiktokLine size={18} /> // Kept for completeness, though not in image
    return null
  }

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="bg-gray-100 py-12"
    >
      <div className="container mx-auto px-4">
        {/* Top Row: Logo/Description and Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Left Side: Company Info (Logo & Description) */}
          <motion.div variants={itemVariants} className="md:w-1/3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-4"
            >
              {logo ? <Media resource={logo} imgClassName="w-10 h-10" /> : 'FP'}
            </motion.div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {companyInfo?.description ||
                "Let's bring your vision to life. Whether you're ready to go or just exploring, drop us a line."}
            </p>
          </motion.div>

          {/* Right Side: Contact Info & Social Links */}
          <motion.div variants={itemVariants} className="md:w-auto flex flex-row gap-6">
            {/* Quick Links Section */}
            {navItems && navItems.length > 0 && (
              <motion.div variants={itemVariants} className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-base">Quick Links:</h3>
                <ul className="space-y-2">
                  {(navItems || []).map(
                    (item, index) =>
                      item.link && (
                        <motion.li
                          key={item.id || index}
                          whileHover={{ x: 5 }}
                          className="transition-transform duration-200"
                        >
                          <CMSLink
                            {...item.link}
                            className="text-gray-700 text-sm hover:text-blue-600 transition-colors duration-300"
                          >
                            {item.link.label}
                          </CMSLink>
                        </motion.li>
                      ),
                  )}
                </ul>
              </motion.div>
            )}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-base">Contact Info:</h3>
              {companyInfo?.phone && (
                <motion.p
                  whileHover={{ x: 3 }}
                  className="text-gray-700 text-sm mb-1 flex items-center transition-transform duration-200"
                >
                  <Phone size={16} className="mr-2 text-gray-600" />
                  {companyInfo.phone}
                </motion.p>
              )}
              {companyInfo?.email && (
                <motion.p
                  whileHover={{ x: 3 }}
                  className="text-gray-700 text-sm mb-4 flex items-center transition-transform duration-200"
                >
                  <Mail size={16} className="mr-2 text-gray-600" />
                  {companyInfo.email}
                </motion.p>
              )}

              {socialLinks && socialLinks.length > 0 && (
                <div className="flex space-x-3 mt-3">
                  {(socialLinks || []).map(
                    (social, index) =>
                      social.platform &&
                      social.url && (
                        <motion.div
                          key={social.id || `${social.platform}-${index}`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                          >
                            {renderSocialIcon(social.platform)}
                          </Link>
                        </motion.div>
                      ),
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Copyright */}
        <motion.div variants={itemVariants} className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">{copyrightText}</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
