import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/components/cart-context'
import { AuthProvider } from '@/components/auth-context'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Shiv Shakti Traders — Mattresses for Every Indian Home',
  description:
    'Shop orthopedic, memory foam, spring, latex and coir mattresses at prices made for Indian households. Free delivery, 30-night trial and 10-year warranty.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2f4f9e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-dvh flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </CartProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
