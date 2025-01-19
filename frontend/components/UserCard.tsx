import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LanguageBar from './LanguageBar'

interface User {
  id: number;
  name: string;
  icon: string;
  repoCount: number;
  commitCount: number;
  languages: { name: string; percentage: number }[];
}

const UserCard = ({ user }: { user: User }) => {
  return (
    <Link href={`/user/${user.name.replace(/\s+/g, '')}`} passHref>
      <Card className="hover:bg-gray-800 transition-colors duration-200 bg-gray-850 fixed-height-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Image
              src={user.icon && user.icon.startsWith('http') ? user.icon : "/placeholder.svg"}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <CardTitle>{user.name}</CardTitle>
          </div>
          <div className="flex flex-col items-end text-sm text-gray-400 space-y-1">
            <div className="flex items-center">
              {/* Custom Commit Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 mr-1">
                <path d="M 256 332.8 Q 276.8 332.8 294.4 322.4 L 294.4 322.4 L 294.4 322.4 Q 312 312 322.4 294.4 Q 332.8 276 332.8 256 Q 332.8 236 322.4 217.6 Q 312 200 294.4 189.6 Q 276.8 179.2 256 179.2 Q 235.2 179.2 217.6 189.6 Q 200 200 189.6 217.6 Q 179.2 236 179.2 256 Q 179.2 276 189.6 294.4 Q 200 312 217.6 322.4 Q 235.2 332.8 256 332.8 L 256 332.8 Z M 357.6 268.8 Q 352 307.2 324 332.8 L 324 332.8 L 324 332.8 Q 296 357.6 256 358.4 Q 216 357.6 188 332.8 Q 160 307.2 154.4 268.8 L 12.8 268.8 L 12.8 268.8 Q 0.8 268 0 256 Q 0.8 244 12.8 243.2 L 154.4 243.2 L 154.4 243.2 Q 160 204.8 188 179.2 Q 216 154.4 256 153.6 Q 296 154.4 324 179.2 Q 352 204.8 357.6 243.2 L 499.2 243.2 L 499.2 243.2 Q 511.2 244 512 256 Q 511.2 268 499.2 268.8 L 357.6 268.8 L 357.6 268.8 Z"/>
              </svg>
              <span>{user.commitCount} commits</span>
            </div>
            <div className="flex items-center">
              {/* Repositories Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 mr-1">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
              </svg>
              <span>{user.repoCount} repositories</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <LanguageBar languages={user.languages} />
        </CardContent>
      </Card>
    </Link>
  )
}

export default UserCard;

