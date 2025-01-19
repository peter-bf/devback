'use client'

import { useState, useEffect } from 'react'
import { Star, GitBranch, Eye } from 'lucide-react'

interface Repository {
  name: string
  description: string
  stars: number
  forks: number
  watchers: number
  language: string
  lastUpdated: string
}

export default function RepositoryPage({ params }: { params: { name: string } }) {
  const [repository, setRepository] = useState<Repository | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await fetch(`/api/repository/${params.name}`)
        if (!response.ok) throw new Error('Failed to fetch repository data')
        const data = await response.json()
        setRepository(data)
      } catch (err) {
        setError('Failed to load repository data. Please try again.')
        // If API fails, set template data
        setRepository({
          name: params.name,
          description: 'This is a template repository description.',
          stars: 100,
          forks: 50,
          watchers: 75,
          language: 'JavaScript',
          lastUpdated: '2023-06-01'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRepository()
  }, [params.name])

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
  if (!repository) return <div className="text-center mt-8">Repository not found</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{repository.name}</h1>
      <p className="text-xl mb-8">{repository.description}</p>
      <div className="flex space-x-6 mb-8">
        <div className="flex items-center">
          <Star className="mr-2" size={20} />
          <span>{repository.stars} stars</span>
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
        <p className="text-lg">Primary language: <span className="font-semibold">{repository.language}</span></p>
        <p className="text-lg">Last updated: <span className="font-semibold">{repository.lastUpdated}</span></p>
      </div>
      {/* Add more repository details here */}
    </div>
  )
}

