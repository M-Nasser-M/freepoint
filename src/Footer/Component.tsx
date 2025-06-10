import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { FooterClient } from './Component.client'

export async function Footer() {
  const footerData: FooterType | null = await getCachedGlobal('footer', 1)()

  if (!footerData) {
    // Optionally handle the case where footer data is not found
    // console.error('Footer data not found!')
    return null
  }

  return <FooterClient data={footerData} />
}
