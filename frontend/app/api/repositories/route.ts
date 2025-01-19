import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)

  // This is where you would typically fetch data from a database
  // For this example, we'll generate mock data
  const repositories = [...Array(limit)].map((_, i) => ({
    id: (page - 1) * limit + i + 1,
    name: `Repository ${(page - 1) * limit + i + 1}`,
    icon: '📁',
    starCount: Math.floor(Math.random() * 1000),
    description: `This is a description for Repository ${(page - 1) * limit + i + 1}.`
  })).filter(repo => repo.name.toLowerCase().includes(search.toLowerCase()))

  return NextResponse.json(repositories)
}

