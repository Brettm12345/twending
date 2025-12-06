'use client'

import {ChevronDown} from 'lucide-react'

import {useLanguage} from '@/atoms/language'
import {LanguageIndicator} from '@/components/language-indicator'
import {Button} from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {languages} from '@/lib/languages'

export const LanguageSelect = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const [language, setLanguage] = useLanguage()
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" {...props}>
          <LanguageIndicator language={language} />
          {language}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Command>
          <CommandInput placeholder="Search for a language" />
          <CommandList>
            <CommandEmpty>No languages found</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => setLanguage('All Languages')}
              >
                <LanguageIndicator language="All Languages" />
                All Languages
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Popular">
              {languages.popular.map(language => (
                <CommandItem
                  key={language}
                  value={language}
                  onSelect={() => setLanguage(language)}
                >
                  <LanguageIndicator language={language} />
                  {language}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Other">
              {languages.everythingElse.map(language => (
                <CommandItem
                  key={language}
                  value={language}
                  onSelect={() => setLanguage(language)}
                >
                  <LanguageIndicator language={language} />
                  {language}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
