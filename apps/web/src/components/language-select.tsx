"use client";

import { RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";
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

function LanguageSelectContent({ onClose }: { onClose: () => void }) {
  const setLanguage = useSetLanguage();
  return (
    <Command className="bg-transparent">
      <CommandInput placeholder="Search for a language" />
      <CommandList>
        <CommandEmpty>No languages found</CommandEmpty>
        <CommandGroup>
          <CommandItem
            onSelect={() => setLanguage("All Languages")}
            value="all"
          >
            <LanguageIndicator language="All Languages" />
            All Languages
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Popular">
          {languages.popular.map((language) => (
            <CommandItem
              key={language}
              onSelect={() => {
                setLanguage(language);
                onClose();
              }}
              value={language}
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
              onSelect={() => {
                setLanguage(language);
                onClose();
              }}
              value={language}
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  if (isMobile) {
    return (
      <Drawer onOpenChange={setDrawerOpen} open={drawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" {...props}>
            <LanguageIndicator language={language} />
            {language}
            <RiArrowDownSLine />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Language</DrawerTitle>
            <DrawerDescription>Select your language</DrawerDescription>
          </DrawerHeader>
          <LanguageSelectContent onClose={() => setDrawerOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" {...props}>
            <LanguageIndicator language={language} />
            {language}
            <RiArrowDownSLine />
          </Button>
        }
      />
      <PopoverContent align="end" className="w-auto p-0">
        <LanguageSelectContent onClose={() => setPopoverOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};
