import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MenuBar from '@/components/MenuBar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevBack',
  description: 'A blockchain Starknet platform to support Open-Source developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/img/icon.png" type="image/png" />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 min-h-screen flex flex-col`}>
        <MenuBar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
