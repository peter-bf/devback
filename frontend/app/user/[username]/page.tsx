'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import RepositoryCard from '@/components/RepositoryCard'

interface User {
  name: string
  description: string
  avatarUrl: string
  repositories: {
    name: string
    icon: string
    starCount: number
    description: string
  }[]
}

export default function UserPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${params.username}`)
        if (!response.ok) throw new Error('Failed to fetch user data')
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError('Failed to load user data. Please try again.')
        // If API fails, set template data
        setUser({
          name: params.username,
          description: 'This is a template user description.',
          avatarUrl: `https://github.com/${params.username}.png`,
          repositories: [
            { name: 'Repo 1', icon: '📁', starCount: 120, description: 'Template repository 1' },
            { name: 'Repo 2', icon: '📁', starCount: 85, description: 'Template repository 2' },
            { name: 'Repo 3', icon: '📁', starCount: 230, description: 'Template repository 3' },
          ]
        })
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
          src={user.avatarUrl || "/placeholder.svg"}
          alt={user.name}
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
        <p className="text-xl mb-6">{user.description}</p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          Donate
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6">Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.repositories.map((repo, index) => (
          <RepositoryCard key={index} repo={repo} />
        ))}
      </div>
    </div>
  )
}

