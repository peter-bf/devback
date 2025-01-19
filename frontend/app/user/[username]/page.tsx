'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import RepositoryCard from '@/components/RepositoryCard'
import { templateDevelopers } from '@/lib/templateData'
import LanguageBar from '@/components/LanguageBar'
import { GitCommit, FolderGit2 } from 'lucide-react'

interface User {
  name: string
  description: string
  icon: string
  repoCount: number
  commitCount: number
  languages: { name: string; percentage: number }[]
  repositories: {
    id: number
    name: string
    icon: string
    starCount: number
    description: string
    languages: { name: string; percentage: number }[]
  }[]
}

export default function UserPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        const foundUser = templateDevelopers.find(dev => dev.name.toLowerCase() === params.username.toLowerCase())
        if (!foundUser) throw new Error('User not found')
        setUser(foundUser)
      } catch (err) {
        setError('User not found')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
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
        <p className="text-xl mb-6">{user.description}</p>
        <div className="flex justify-center items-center space-x-4 mb-6">
          <span className="flex items-center text-gray-400">
            <FolderGit2 size={20} className="mr-2" />
            {user.repoCount} repositories
          </span>
          <span className="flex items-center text-gray-400">
            <GitCommit size={20} className="mr-2" />
            {user.commitCount} commits
          </span>
        </div>
        <div className="max-w-md mx-auto mb-6">
          <LanguageBar languages={user.languages} />
        </div>
        <div className="flex justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center text-lg">
            <Image
              src="https://cryptologos.cc/logos/starknet-token-strk-logo.svg?v=040"
              alt="Starknet Logo"
              width={28}
              height={28}
              className="mr-2"
            />
            Donate
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.repositories.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

