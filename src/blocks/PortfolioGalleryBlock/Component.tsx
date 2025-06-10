"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface PortfolioItem {
  id: string
  title: string
  category?: { title: string } | string // From relationship or text
  image: string | { url?: string; alt?: string; filename?: string } // Payload media object or URL string
  description?: string
  // Add other fields from your 'portfolio' collection as needed
}

interface PortfolioGalleryBlockProps {
  title?: string // Optional title for the section
  portfolioItems: PortfolioItem[]
  categoriesFromCMS?: { id: string; title: string }[] // Categories from a collection relationship
  showFilters?: boolean
  columns?: '2' | '3' | '4'
  defaultFilter?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
}

export function PortfolioGalleryBlock({
  title,
  portfolioItems = [],
  categoriesFromCMS = [],
  showFilters = true,
  columns = '3',
  defaultFilter = "All Works",
}: PortfolioGalleryBlockProps) {
  const [activeFilter, setActiveFilter] = useState(defaultFilter)
  const [filteredItems, setFilteredItems] = useState(portfolioItems)

  useEffect(() => {
    handleFilter(activeFilter); // Apply initial filter or when items change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioItems, activeFilter]);

  const gridCols = {
    '2': "md:grid-cols-2",
    '3': "md:grid-cols-3",
    '4': "md:grid-cols-4",
  }

  const getCategoryTitle = (category: { title: string } | string | undefined): string => {
    if (!category) return '';
    if (typeof category === 'string') return category;
    return category.title || ''; // Handles the { title: string } case
  }

  const uniqueCategories = categoriesFromCMS.length > 0 
    ? categoriesFromCMS.map(c => c.title)
    : Array.from(new Set(portfolioItems.map(item => getCategoryTitle(item.category)).filter(Boolean)));

  const handleFilter = (categoryLabel: string) => {
    setActiveFilter(categoryLabel)
    if (categoryLabel === "All Works") {
      setFilteredItems(portfolioItems)
    } else {
      setFilteredItems(portfolioItems.filter((item) => getCategoryTitle(item.category) === categoryLabel))
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{title}</h2>}
        {showFilters && uniqueCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => handleFilter("All Works")}
                className={`transition-all duration-300 ${activeFilter === "All Works" ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
              >
                All Works
              </Button>
            </motion.div>
            {uniqueCategories.map((catLabel) => (
              <motion.div key={catLabel} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => handleFilter(catLabel)}
                  className={`transition-all duration-300 ${activeFilter === catLabel ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                >
                  {catLabel}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div layout variants={containerVariants} initial="hidden" animate="visible" className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
          <AnimatePresence mode="sync">
            {filteredItems.map((item) => {
              const imageUrl = typeof item.image === 'string' ? item.image : item.image?.url;
              const imageAlt = typeof item.image === 'string' ? item.title : item.image?.alt || item.image?.filename || item.title;

              return (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemVariants}
                  initial="hidden" // Already handled by parent, but good for direct use
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -8, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-4"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }} // Changed from whileHover to animate for consistent visibility
                        transition={{ duration: 0.3, delay: 0.1 }} // Added delay
                        className="text-white text-center"
                      >
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{item.title}</h3>
                        {item.description && <p className="text-sm line-clamp-3">{item.description}</p>}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
