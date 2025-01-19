import Link from 'next/link'
import UserCard from './UserCard'
import { templateDevelopers } from '@/lib/templateData';

const TrendingSection = () => {
  const trendingDevelopers = templateDevelopers;

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6">Trending Devs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingDevelopers.map((developer) => (
          <UserCard key={developer.id} user={developer} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/search" className="text-blue-400 hover:text-blue-300">
          Find more devs
        </Link>
      </div>
    </section>
  )
}

export default TrendingSection

