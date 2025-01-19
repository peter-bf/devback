import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)

  // This is where you would typically fetch data from a database
  // For this example, we'll generate mock data
  const users = [...Array(limit)].map((_, i) => ({
    id: (page - 1) * limit + i + 1,
    name: `User${(page - 1) * limit + i + 1}`,
    icon: '👤',
    repoCount: Math.floor(Math.random() * 50),
  })).filter(user => user.name.toLowerCase().includes(search.toLowerCase()))

  return NextResponse.json(users)
}

