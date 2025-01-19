'use client'

import { useState, useEffect } from 'react'
import UserCard from '@/components/UserCard'
import RepositoryCard from '@/components/RepositoryCard'
import { fetchDevelopers, fetchRepositories } from '@/lib/api'

const ITEMS_PER_PAGE = 100

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('user')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      setError(null)
      
      try {
        let results;
        if (searchType === 'user') {
          results = await fetchDevelopers();
        } else {
          results = await fetchRepositories();
        }

        // Sort users by most commits before displaying
        if (searchType === 'user') {
          results = results.sort((a, b) => b.num_commits - a.num_commits);
        }

        // Filter results based on search term
        if (searchTerm) {
          results = results.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setItems(results.slice(0, ITEMS_PER_PAGE))
      } catch (err) {
        setError('Failed to fetch results')
      }

      setLoading(false)
    }

    fetchItems()
  }, [searchTerm, searchType])

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Search</h1>
      <div className="flex items-center mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder={`Search ${searchType}s...`}
            className="w-full p-2 pl-10 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex ml-4 space-x-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="user"
              checked={searchType === 'user'}
              onChange={() => setSearchType('user')}
              className="hidden"
            />
            <span className={`px-4 py-2 rounded-md w-24 text-center flex justify-center items-center ${searchType === 'user' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}>Users</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="repository"
              checked={searchType === 'repository'}
              onChange={() => setSearchType('repository')}
              className="hidden"
            />
            <span className={`px-4 py-2 rounded-md w-24 text-center flex justify-center items-center ${searchType === 'repository' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}>Repositories</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <p className="col-span-3 text-center mt-4">Loading...</p>}
        {error && <p className="col-span-3 text-center mt-4 text-red-500">{error}</p>}
        {!loading && !error && items.length === 0 && <p className="col-span-3 text-center mt-4">No results found.</p>}
        {!loading && !error && items.length > 0 && (
          items.map((item) => (
            searchType === 'user'
              ? <UserCard key={item.dev_id} user={item} />
              : <RepositoryCard key={item.repo_id} repo={item} />
          ))
        )}
      </div>
    </div>
  )
}
