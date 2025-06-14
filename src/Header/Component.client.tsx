'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation =
    data?.navItems?.sort((a, b) => a.order - b.order)?.map((item) => item.link) || []

  // Split navigation links for desktop layout
  const leftNav = navigation.slice(0, 4)
  const rightNav = navigation.slice(4)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
    >
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between relative">
          {/* Left navigation (first 4 links) – desktop only */}
          <nav className="hidden xl:flex items-center space-x-8">
            {leftNav.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CMSLink
                  {...item}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
                >
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </CMSLink>
              </motion.div>
            ))}
          </nav>

          {/* Center logo – always visible, but positioned absolutely for desktop */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            <Link href="/" className="flex items-center space-x-2">
              {data?.logo && typeof data.logo === 'object' ? (
                <Media resource={data.logo} imgClassName="w-10 h-10" />
              ) : (
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FP</span>
                </div>
              )}
            </Link>
          </motion.div>

          {/* Right navigation (remaining links) – desktop only */}
          <nav className="hidden xl:flex items-center space-x-8 ml-auto">
            {rightNav.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CMSLink
                  {...item}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
                >
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </CMSLink>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 ml-auto"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="xl:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 mt-4">
                {navigation.map((item, index) => (
                  <div key={index} onClick={() => setIsMobileMenuOpen(false)}>
                    <CMSLink
                      {...item}
                      className="text-gray-700 hover:text-blue-600 py-2 transition-colors duration-300"
                    />
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
