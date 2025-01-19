'use client'

import Link from 'next/link'
import { GithubIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"

const MenuBar = () => {
  const pathname = usePathname()

  const scrollToFAQ = (e: React.MouseEvent) => {
    e.preventDefault()
    const faqSection = document.getElementById('faq')
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#faq'
    }
  }

  return (
    <nav className="bg-gray-950 p-4 sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center">
            <svg className="w-8 h-8 text-white animate-spin-reverse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link href="/search" className="text-gray-300 hover:text-white">Search</Link>
          <a href="#faq" onClick={scrollToFAQ} className="text-gray-300 hover:text-white">FAQ</a>
        </div>
        <Button variant="outline white-100" className="bg-gray-850 hover:bg-gray-800">
          <GithubIcon className="mr-2" size={20} />
          Login with GitHub
        </Button>
      </div>
    </nav>
  )
}

export default MenuBar

