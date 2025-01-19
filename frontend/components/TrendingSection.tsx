import Link from 'next/link'
import UserCard from './UserCard'

const TrendingSection = () => {
  const trendingUsers = [
    { name: 'User 1', icon: '👤', repoCount: 15, languages: { JavaScript: 50, TypeScript: 30, Python: 20 } },
    { name: 'User 2', icon: '👤', repoCount: 8, languages: { Java: 60, Kotlin: 40 } },
    { name: 'User 3', icon: '👤', repoCount: 22, languages: { Ruby: 40, JavaScript: 35, CSS: 25 } },
    { name: 'User 4', icon: '👤', repoCount: 12, languages: { Python: 70, JavaScript: 30 } },
  ]

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Trending Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingUsers.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/search" className="text-blue-400 hover:text-blue-300">
          Find more users
        </Link>
      </div>
    </section>
  )
}

export default TrendingSection

