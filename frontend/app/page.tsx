import Hero from '@/components/Hero'
import TrendingSection from '@/components/TrendingSection'
import FAQSection from '@/components/FAQSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 space-y-4">
        <Hero />
        <TrendingSection />
        <FAQSection />
      </div>
    </div>
  )
}

