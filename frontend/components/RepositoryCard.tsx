import Link from 'next/link'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Repository {
  name: string
  icon: string
  starCount: number
  description: string
  languages: {
    [key: string]: number
  }
}

const RepositoryCard = ({ repo }: { repo: Repository }) => {
  return (
    <Link href={`/repository/${repo.name}`}>
      <Card className="hover:bg-gray-800 transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
              <span className="text-2xl">{repo.icon}</span>
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
          <div className="language-bar flex border border-white/10 rounded-full overflow-hidden">
            {Object.entries(repo.languages).map(([lang, percentage]) => (
              <div
                key={lang}
                style={{
                  backgroundColor: `var(--lang-${lang.toLowerCase()})`,
                  width: `${percentage}%`,
                }}
                className="h-2 relative group"
              >
                <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black text-white text-xs rounded py-1 px-2 pointer-events-none">
                    {lang}: {percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default RepositoryCard

