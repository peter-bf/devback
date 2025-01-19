import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LanguageBar from './LanguageBar'

interface User {
  dev_id: number;
  name: string;
  icon: string;
  num_commits: number;
  languages: string | null;
}

const getRandomLanguages = () => {
  const allLanguages = ['JavaScript', 'Python', 'Ruby', 'Go', 'Rust', 'Java', 'HTML', 'C#'];
  const shuffled = allLanguages.sort(() => 0.5 - Math.random());
  const selectedLanguages = shuffled.slice(0, 4);
  
  let remainingPercentage = 100;
  const languagesWithPercentages = selectedLanguages.map((lang, index) => {
    const percentage = index === selectedLanguages.length - 1 ? remainingPercentage : Math.floor(Math.random() * (remainingPercentage / 2)) + 10;
    remainingPercentage -= percentage;
    return { name: lang, percentage };
  });
  
  return languagesWithPercentages;
};

const UserCard = ({ user }: { user: User }) => {
  return (
    <Link href={`/user/${user.name.replace(/\s+/g, '')}`} passHref>
      <Card className="hover:bg-gray-800 transition-colors duration-200 bg-gray-850 fixed-height-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Image
              src={user.icon || "/placeholder.svg"}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <CardTitle className='text-base'>{user.name}</CardTitle>
          </div>
          <div className="flex flex-col items-end text-sm text-gray-400 space-y-1">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 mr-1">
              <path d="M 256 332.8 Q 276.8 332.8 294.4 322.4 L 294.4 322.4 L 294.4 322.4 Q 312 312 322.4 294.4 Q 332.8 276 332.8 256 Q 332.8 236 322.4 217.6 Q 312 200 294.4 189.6 Q 276.8 179.2 256 179.2 Q 235.2 179.2 217.6 189.6 Q 200 200 189.6 217.6 Q 179.2 236 179.2 256 Q 179.2 276 189.6 294.4 Q 200 312 217.6 322.4 Q 235.2 332.8 256 332.8 L 256 332.8 Z M 357.6 268.8 Q 352 307.2 324 332.8 L 324 332.8 L 324 332.8 Q 296 357.6 256 358.4 Q 216 357.6 188 332.8 Q 160 307.2 154.4 268.8 L 12.8 268.8 L 12.8 268.8 Q 0.8 268 0 256 Q 0.8 244 12.8 243.2 L 154.4 243.2 L 154.4 243.2 Q 160 204.8 188 179.2 Q 216 154.4 256 153.6 Q 296 154.4 324 179.2 Q 352 204.8 357.6 243.2 L 499.2 243.2 L 499.2 243.2 Q 511.2 244 512 256 Q 511.2 268 499.2 268.8 L 357.6 268.8 L 357.6 268.8 Z"/>
              </svg>
              <span className='text-xs'>{user.num_commits} commits</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <LanguageBar languages={getRandomLanguages()} />
        </CardContent>
      </Card>
    </Link>
  )
}

export default UserCard;
