'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import RepositoryCard from '@/components/RepositoryCard'
import { fetchDevelopers, fetchRepositories } from '@/lib/api'
import LanguageBar from '@/components/LanguageBar'
import { GitCommit } from 'lucide-react'

interface User {
  dev_id: number
  name: string
  icon: string
  num_commits: number
  languages: string | null
}

export default function UserPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRepositories, setUserRepositories] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const developers = await fetchDevelopers()
        const foundUser = developers.find(dev => dev.name.toLowerCase() === params.username.toLowerCase())
        if (!foundUser) throw new Error('User not found')
        setUser(foundUser)

        const repositories = await fetchRepositories()
        const shuffledRepos = repositories.sort(() => 0.5 - Math.random()).slice(0, 3)
        setUserRepositories(shuffledRepos)
      } catch (err) {
        setError('User not found')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [params.username])

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
  if (!user) return <div className="text-center mt-8">User not found</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Image
          src={user.icon || "/placeholder.svg"}
          alt={user.name}
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
        <div className="flex justify-center items-center space-x-4 mb-6">
          <span className="flex items-center text-gray-400">
            <GitCommit size={20} className="mr-2" />
            {user.num_commits} commits
          </span>
        </div>
        {user.languages && (
          <div className="max-w-md mx-auto mb-6">
            <LanguageBar languages={JSON.parse(user.languages)} />
          </div>
        )}
        <div className="flex justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center text-lg">
            <Image
              src="https://cryptologos.cc/logos/starknet-token-strk-logo.svg?v=040"
              alt="Starknet Logo"
              width={28}
              height={28}
              className="mr-1"
            />
            Donate
          </button>
        </div>
      </div>
      {userRepositories.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Top 3 Repositories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRepositories.map((repo) => (
              <RepositoryCard key={repo.repo_id} repo={repo} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
