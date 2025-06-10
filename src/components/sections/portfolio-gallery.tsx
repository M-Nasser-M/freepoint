'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  description?: string
}

interface PortfolioGalleryProps {
  items: PortfolioItem[]
  categories?: string[]
  showFilters?: boolean
  columns?: 2 | 3 | 4
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
}

export function PortfolioGallery({
  items,
  categories = [],
  showFilters = true,
  columns = 3,
}: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState('All Works')
  const [filteredItems, setFilteredItems] = useState(items)

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }

  const handleFilter = (category: string) => {
    setActiveFilter(category)
    if (category === 'All Works') {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter((item) => item.category === category))
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {showFilters && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => handleFilter('All Works')}
                className={`transition-all duration-300 ${
                  activeFilter === 'All Works' ? 'bg-blue-600 text-white' : ''
                }`}
              >
                All Works
              </Button>
            </motion.div>
            {categories.map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => handleFilter(category)}
                  className={`transition-all duration-300 ${activeFilter === category ? 'bg-blue-600 text-white' : ''}`}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div layout className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg aspect-video">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-white text-center"
                    >
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      {item.description && <p className="text-sm">{item.description}</p>}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
