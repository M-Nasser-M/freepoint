"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

interface ContactFormSectionProps {
  title: string
  fields: Array<{
    name: string
    label: string
    type: "text" | "email" | "tel" | "select" | "textarea"
    required?: boolean
    options?: string[]
  }>
  sideContent?: {
    type: "image" | "info"
    content: string
    title?: string
    description?: string
  }
  submitText?: string
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function ContactFormSection({ title, fields, sideContent, submitText = "Submit" }: ContactFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  {title}
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    className="text-yellow-400"
                  >
                    ⭐
                  </motion.span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <Label htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </Label>

                      {field.type === "select" ? (
                        <Select>
                          <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option.toLowerCase()}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "textarea" ? (
                        <Textarea
                          id={field.name}
                          placeholder={field.label}
                          rows={4}
                          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <Input
                          id={field.name}
                          type={field.type}
                          placeholder={field.label}
                          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </motion.div>
                  ))}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 relative overflow-hidden"
                    >
                      <motion.span
                        animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {submitText}
                      </motion.span>
                      {isSubmitting && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          />
                        </motion.div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {sideContent && (
            <motion.div variants={itemVariants} className="flex items-center justify-center">
              {sideContent.type === "image" ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-96"
                >
                  <Image
                    src={sideContent.content || "/placeholder.svg"}
                    alt="Contact"
                    fill
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              ) : (
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card className="bg-blue-600 text-white">
                    <CardContent className="p-8">
                      {sideContent.title && (
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="text-xl font-bold mb-4"
                        >
                          {sideContent.title}
                        </motion.h3>
                      )}
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg"
                      >
                        {sideContent.content}
                      </motion.p>
                      {sideContent.description && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="mt-4 opacity-90"
                        >
                          {sideContent.description}
                        </motion.p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
