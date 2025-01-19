import Link from 'next/link'
import { Book } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Language {
  [key: string]: number
}

interface User {
  name: string
  icon: string
  repoCount: number
  commitCount: number
  id: number; // Added id to User interface
  languages: Language
}

const UserCard = ({ user }: { user: User }) => {
  return (
    <Link href={`/user/${user.name}`}>
      <Card className="hover:bg-gray-800 transition-colors duration-200">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.icon} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle>{user.name}</CardTitle>
            <div className="flex items-center text-sm text-gray-400">
              <Book size={14} className="mr-1" />
              <span>{user.repoCount} repositories</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512" className="mr-1">
              <path d="M 256 332.8 Q 276.8 332.8 294.4 322.4 L 294.4 322.4 L 294.4 322.4 Q 312 312 322.4 294.4 Q 332.8 276 332.8 256 Q 332.8 236 322.4 217.6 Q 312 200 294.4 189.6 Q 276.8 179.2 256 179.2 Q 235.2 179.2 217.6 189.6 Q 200 200 189.6 217.6 Q 179.2 236 179.2 256 Q 179.2 276 189.6 294.4 Q 200 312 217.6 322.4 Q 235.2 332.8 256 332.8 L 256 332.8 Z M 357.6 268.8 Q 352 307.2 324 332.8 L 324 332.8 L 324 332.8 Q 296 357.6 256 358.4 Q 216 357.6 188 332.8 Q 160 307.2 154.4 268.8 L 12.8 268.8 L 12.8 268.8 Q 0.8 268 0 256 Q 0.8 244 12.8 243.2 L 154.4 243.2 L 154.4 243.2 Q 160 204.8 188 179.2 Q 216 154.4 256 153.6 Q 296 154.4 324 179.2 Q 352 204.8 357.6 243.2 L 499.2 243.2 L 499.2 243.2 Q 511.2 244 512 256 Q 511.2 268 499.2 268.8 L 357.6 268.8 L 357.6 268.8 Z" />
            </svg>
            <span>#{user.id} - {user.commitCount} commits</span> {/* Updated commit count display */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="language-bar flex border border-white/10 rounded-full overflow-hidden">
            {Object.entries(user.languages).map(([lang, percentage]) => (
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

export default UserCard

