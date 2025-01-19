import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LanguageBar from './LanguageBar'

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

const RepositoryCard = ({ repo }: { repo: Repository }) => {
  return (
    <Link href={`/repository/${encodeURIComponent(repo.name)}`}>
      <Card className="hover:bg-gray-800 transition-colors duration-200 bg-gray-850 fixed-height-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
              <Image 
                src={repo.icon || `/placeholder.svg?height=40&width=40`}
                alt={repo.name}
                width={40}
                height={40}
              />
            </div>
            <CardTitle>{repo.name}</CardTitle>
          </div>
          <div className="flex items-center">
            <span className="mr-2">{repo.stars}</span>
            <Star size={16} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400 mb-2">{repo.desc}</p>
          <div className="mt-auto">
            {repo.language && (
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: `var(--lang-${repo.language.toLowerCase()})` }}
                />
                <span className="text-sm">{repo.language}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default RepositoryCard

