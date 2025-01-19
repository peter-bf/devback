import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LanguageBar from './LanguageBar'

interface Language {
  name: string
  percentage: number
}

interface Repository {
  id: number
  name: string
  icon: string
  starCount: number
  description: string
  languages: { name: string; percentage: number }[]
}

const RepositoryCard = ({ repo }: { repo: Repository }) => {
  return (
    <Link href={`/repository/${encodeURIComponent(repo.name)}`}>
      <Card className="hover:bg-gray-800 transition-colors duration-200 bg-gray-850 fixed-height-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
              <Image 
                src={`/placeholder.svg?height=40&width=40`}
                alt={repo.name}
                width={40}
                height={40}
              />
            </div>
            <CardTitle>{repo.name}</CardTitle>
          </div>
          <div className="flex items-center">
            <span className="mr-2">{repo.starCount}</span>
            <Star size={16} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400 mb-2">{repo.description}</p>
          <div className="mt-auto">
            <LanguageBar languages={repo.languages} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default RepositoryCard

