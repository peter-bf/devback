'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, GitBranch, Eye } from 'lucide-react'
import { fetchRepositories, fetchDevelopers } from '@/lib/api'
import UserCard from '@/components/UserCard'

interface Repository {
  repo_id: number
  name: string
  icon: string
  stars: number
  language: string | null
  desc: string
  forks: number
  repo_url: string
}

export default function RepositoryPage({ params }: { params: { name: string } }) {
  const [repository, setRepository] = useState<Repository | null>(null)
  const [topContributors, setTopContributors] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositoryData = async () => {
      setLoading(true)
      setError(null)
      try {
        const repositories = await fetchRepositories()
        const repo = repositories.find(r => r.name.toLowerCase() === params.name.toLowerCase())
        if (!repo) throw new Error('Repository not found')
        setRepository(repo)

        const developers = await fetchDevelopers()
        const sortedDevelopers = developers.sort((a, b) => b.num_commits - a.num_commits)
        setTopContributors(sortedDevelopers.slice(0, 9))
      } catch (err) {
        setError('Failed to load repository data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchRepositoryData()
  }, [params.name])

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
  if (!repository) return <div className="text-center mt-8">Repository not found</div>


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 rounded-md bg-gray-700 flex items-center justify-center mr-4 overflow-hidden">
          <Image 
            src={repository.icon || `/placeholder.svg?height=64&width=64`}
            alt={repository.name}
            width={64}
            height={64}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{repository.name}</h1>
          <p className="text-xl text-gray-400 mt-2">{repository.desc}</p>
        </div>
      </div>
      <div className="flex space-x-6 mb-8">
        <div className="flex items-center">
          <Star className="mr-2" size={20} />
          <span>{repository.stars} stars</span>
        </div>
        <div className="flex items-center">
          <GitBranch className="mr-2" size={20} />
          <span>{repository.forks} forks</span>
        </div>
      </div>
      {repository.language && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Language</h2>
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: `var(--lang-${repository.language.toLowerCase()})` }}
            />
            <span>{repository.language}</span>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topContributors.map((contributor) => (
            <UserCard key={contributor.dev_id} user={contributor} />
          ))}
        </div>
      </div>
    </div>
  )
}

