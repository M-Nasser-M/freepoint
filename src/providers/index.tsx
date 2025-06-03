import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { NextIntlClientProvider } from 'next-intl'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
