import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Language {
  name: string
  percentage: number
}

interface LanguageBarProps {
  languages: Language[] | { [key: string]: number }
}

const LanguageBar: React.FC<LanguageBarProps> = ({ languages }) => {
  const languageArray = Array.isArray(languages)
    ? languages
    : Object.entries(languages).map(([name, percentage]) => ({ name, percentage }));

  const getLanguageColor = (name: string) => {
    const lowerCaseName = name.toLowerCase();
    return lowerCaseName === 'c#' || lowerCaseName === 'csharp' ? 'var(--lang-csharp)' : `var(--lang-${lowerCaseName})`;
  };

  return (
    <div className="space-y-2">
      <div className="language-bar flex border border-white/10 rounded-full overflow-hidden">
        <TooltipProvider>
          {languageArray.map((lang) => (
            <Tooltip key={lang.name}>
              <TooltipTrigger asChild>
                <div
                  style={{ 
                    width: `${lang.percentage}%`,
                    backgroundColor: getLanguageColor(lang.name),
                  }}
                  className="h-2"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{lang.name}: {lang.percentage}%</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <div className="flex flex-wrap gap-2">
        {languageArray.map((lang) => (
          <div key={lang.name} className="flex items-center text-xs">
            <div 
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: getLanguageColor(lang.name) }}
            />
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LanguageBar

