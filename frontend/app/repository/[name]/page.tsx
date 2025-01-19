'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, GitBranch, Eye } from 'lucide-react'
import { templateRepositories, templateDevelopers } from '@/lib/templateData'
import UserCard from '@/components/UserCard'
import LanguageBar from '@/components/LanguageBar'

interface Repository {
  id: number
  name: string
  icon: string
  starCount: number
  description: string
  languages: { name: string; percentage: number }[]
  forks?: number
  watchers?: number
  lastUpdated?: string
}

export default function RepositoryPage({ params }: { params: { name: string } }) {
  const [repository, setRepository] = useState<Repository | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepository = () => {
      try {
        const repo = templateRepositories.find(r => r.name.toLowerCase() === params.name.toLowerCase())
        if (!repo) throw new Error('Repository not found')
        setRepository({
          ...repo,
          forks: Math.floor(repo.starCount / 2),
          watchers: Math.floor(repo.starCount / 3),
          lastUpdated: '2023-06-01'
        })
      } catch (err) {
        setError('Failed to load repository data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchRepository()
  }, [params.name])

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
  if (!repository) return <div className="text-center mt-8">Repository not found</div>

  const topContributors = templateDevelopers.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 rounded-md bg-gray-700 flex items-center justify-center mr-4 overflow-hidden">
          <Image 
            src={`/placeholder.svg?height=64&width=64`}
            alt={repository.name}
            width={64}
            height={64}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{repository.name}</h1>
          <p className="text-xl text-gray-400 mt-2">{repository.description}</p>
        </div>
      </div>
      <div className="flex space-x-6 mb-8">
        <div className="flex items-center">
          <Star className="mr-2" size={20} />
          <span>{repository.starCount} stars</span>
        </div>
        <div className="flex items-center">
          <GitBranch className="mr-2" size={20} />
          <span>{repository.forks} forks</span>
        </div>
        <div className="flex items-center">
          <Eye className="mr-2" size={20} />
          <span>{repository.watchers} watching</span>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Languages</h2>
        <LanguageBar languages={repository.languages} />
      </div>
      <div className="mb-8">
        <p className="text-lg">Last updated: <span className="font-semibold">{repository.lastUpdated}</span></p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topContributors.map((contributor) => (
            <UserCard key={contributor.id} user={contributor} />
          ))}
        </div>
      </div>
    </div>
  )
}

