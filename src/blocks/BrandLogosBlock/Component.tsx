"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link";

interface BrandLogoPayload {
  name: string;
  logo: string | { url?: string; alt?: string }; // Can be a string (URL) or a Media object
  url?: string;
  id?: string; // Payload often includes an id for array items
}

interface BrandLogosBlockProps {
  logos: BrandLogoPayload[]
  title?: string
  backgroundColor?: string
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

const logoVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function BrandLogosBlock({ logos, title, backgroundColor = "bg-white" }: BrandLogosBlockProps) {
  return (
    <section className={`py-12 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-xl font-semibold mb-8 text-gray-800"
          >
            {title}
          </motion.h2>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {logos?.map((brand) => {
            const logoSrc = typeof brand.logo === 'string' ? brand.logo : brand.logo?.url;
            const logoAlt = typeof brand.logo === 'string' ? brand.name : brand.logo?.alt || brand.name;

            if (!logoSrc) return null;

            const imageElement = (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={120}
                height={60}
                className="object-contain"
              />
            );

            return (
              <motion.div
                key={brand.id || brand.name}
                variants={logoVariants}
                whileHover={{
                  scale: 1.1,
                  filter: "grayscale(0%)",
                  transition: { duration: 0.3 },
                }}
                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                {brand.url ? (
                  <Link href={brand.url} target="_blank" rel="noopener noreferrer">
                    {imageElement}
                  </Link>
                ) : (
                  imageElement
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}
