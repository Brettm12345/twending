"use client";

import { ChevronDown } from "lucide-react";

import { useLanguageValue, useSetLanguage } from "@/atoms/language";
import { LanguageIndicator } from "@/components/language-indicator";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { languages } from "@/lib/languages";

function LanguageSelectContent() {
  const setLanguage = useSetLanguage();
  return (
    <Command className="bg-transparent">
      <CommandInput placeholder="Search for a language" />
      <CommandList>
        <CommandEmpty>No languages found</CommandEmpty>
        <CommandGroup>
          <CommandItem
            value="all"
            onSelect={() => setLanguage("All Languages")}
          >
            <LanguageIndicator language="All Languages" />
            All Languages
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Popular">
          {languages.popular.map((language) => (
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
          {languages.everythingElse.map((language) => (
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
  );
}

export const LanguageSelect = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const language = useLanguageValue();
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" {...props}>
            <LanguageIndicator language={language} />
            {language}
            <ChevronDown />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Language</DrawerTitle>
            <DrawerDescription>Select your language</DrawerDescription>
          </DrawerHeader>
          <LanguageSelectContent />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" {...props}>
            <LanguageIndicator language={language} />
            {language}
            <ChevronDown />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="end">
        <LanguageSelectContent />
      </PopoverContent>
    </Popover>
  );
};
