"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle } from 'lucide-react'; // Example icon

interface ServiceItem {
  id: string; // Assuming services will have IDs from CMS
  title: string
  description: string
  features?: { id?: string; featureText: string }[] // Array of feature objects
  icon?: string // For now, string (e.g., SVG name, class, or URL if not using Payload media)
  // If using Payload media for icon: icon?: { url?: string; alt?: string; }
}

interface ServicesGridBlockProps {
  title?: string; // Optional title for the section
  services: ServiceItem[]
  columns?: '2' | '3' | '4'
  backgroundColor?: string // e.g., 'bg-gray-50', 'bg-white'
  cardBackgroundColor?: string // e.g., 'bg-white', 'bg-yellow-50'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function ServicesGridBlock({
  title,
  services = [],
  columns = '3',
  backgroundColor = "bg-white",
  cardBackgroundColor = "bg-gray-50"
}: ServicesGridBlockProps) {
  const gridCols = {
    '2': "md:grid-cols-2",
    '3': "md:grid-cols-3",
    '4': "md:grid-cols-4",
  }

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-gray-800">
            {title}
          </motion.h2>
        )}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                transition: { duration: 0.25 },
              }}
              className="h-full"
            >
              <Card
                className={`${cardBackgroundColor} border-gray-200 h-full flex flex-col transition-shadow duration-300 group rounded-lg shadow-sm`}
              >
                <CardHeader className="pb-4">
                  {/* Icon can be rendered here if available */}
                  {/* {service.icon && <div className="mb-3 text-blue-600"><YourIconComponent name={service.icon} size={30}/></div>} */}
                  <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <CardDescription className="text-gray-600 mb-5 flex-grow">{service.description}</CardDescription>
                  {service.features && service.features.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="space-y-2 mt-auto pt-4 border-t border-gray-200"
                    >
                      {service.features.map((feature) => (
                        <motion.li
                          key={feature.id || feature.featureText} // Use feature.id if available from CMS
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (service.features?.indexOf(feature) || 0) * 0.05 }}
                          className="text-sm text-gray-700 flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                          {feature.featureText}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
