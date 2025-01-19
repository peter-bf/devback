import Hero from '@/components/Hero'
import TrendingSection from '@/components/TrendingSection'
import FAQSection from '@/components/FAQSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <div className="container mx-auto px-4 space-y-4">
        <TrendingSection />
        <FAQSection />
      </div>
    </div>
  )
}

