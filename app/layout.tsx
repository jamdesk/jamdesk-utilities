import type { Metadata } from 'next'
import Script from 'next/script'
import { inter, jetbrainsMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Jamdesk Utilities',
    default: 'MDX Utilities — Free Online Tools | Jamdesk',
  },
  description:
    'Free, open-source MDX tools. Format, validate, preview, and convert MDX files — all client-side.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: 'dark' }}
    >
      <head>
        <Script
          defer
          data-domain="jamdesk.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-[#13111a] text-[#e0e0e4] antialiased">
        {children}
      </body>
    </html>
  )
}
