'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import UserCard from '@/components/UserCard'
import RepositoryCard from '@/components/RepositoryCard'
import { debounce } from 'lodash'

const ITEMS_PER_PAGE = 20

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('user')
  const [items, setItems] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/${searchType}s?search=${searchTerm}&page=${page}&limit=${ITEMS_PER_PAGE}`)
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      setItems(prevItems => [...prevItems, ...data])
      setPage(prevPage => prevPage + 1)
    } catch (err) {
      setError('Failed to load data. Please try again.')
      if (items.length === 0) {
        // Only add template items if there are no items yet
        setItems([...Array(10)].map((_, i) => ({
          id: `template-${i}`,
          name: `Template ${searchType} ${i + 1}`,
          icon: searchType === 'user' ? '👤' : '📁',
          repoCount: 10,
          starCount: 100,
          languages: { JavaScript: 50, TypeScript: 30, Python: 20 },
          description: `This is a template ${searchType} description.`
        })))
      }
    } finally {
      setLoading(false)
    }
  }, [searchTerm, searchType, page, items.length])

  useEffect(() => {
    setItems([])
    setPage(1)
  }, [searchTerm, searchType])

  useEffect(() => {
    if (page === 1) fetchItems()
  }, [fetchItems, page])

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return
    }
    fetchItems()
  }, [fetchItems, loading])

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100)
    window.addEventListener('scroll', debouncedHandleScroll)
    return () => window.removeEventListener('scroll', debouncedHandleScroll)
  }, [handleScroll])

  return (
    <div className="container mx-auto px-4 py-12">
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
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex ml-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="user"
              checked={searchType === 'user'}
              onChange={() => setSearchType('user')}
              className="hidden"
            />
            <span className={`px-4 py-2 rounded-md w-24 text-center ${searchType === 'user' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}>User</span>
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
            <span className={`px-4 py-2 rounded-md w-24 text-center ${searchType === 'repository' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}>Repository</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          searchType === 'user'
            ? <UserCard key={item.id} user={item} />
            : <RepositoryCard key={item.id} repo={item} />
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && items.length === 0 && <p className="text-center mt-4 text-red-500">{error}</p>}
    </div>
  )
}

