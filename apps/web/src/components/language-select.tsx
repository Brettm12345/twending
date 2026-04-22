"use client";

import { useAtom } from "jotai";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { languageAtom, useLanguageValue } from "@/atoms/language";
import { LanguageIndicator } from "@/components/language-indicator";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  type ChevronDownIconHandle,
} from "@/components/ui/chevron-down";
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

const ALL_LANGUAGES_LABEL = "All Languages";
const ALL_LANGUAGES_QUERY_VALUE = "all";
const languageQueryValues = [
  ALL_LANGUAGES_QUERY_VALUE,
  ...Object.keys(languages.colors),
];

function getDefaultLanguageQueryValue(language: string) {
  if (language === ALL_LANGUAGES_LABEL) {
    return ALL_LANGUAGES_QUERY_VALUE;
  }

  if (languageQueryValues.includes(language)) {
    return language;
  }

  return ALL_LANGUAGES_QUERY_VALUE;
}

function LanguageSelectContent({ onClose }: { onClose: () => void }) {
  const [languageLocalStorage, setLanguageLocalStorage] = useAtom(languageAtom);
  const [language, setLanguage] = useQueryState(
    "language",
    parseAsStringEnum(languageQueryValues).withDefault(
      getDefaultLanguageQueryValue(languageLocalStorage),
    ),
  );
  useEffect(() => {
    setLanguageLocalStorage(language);
  }, [language, setLanguageLocalStorage]);
  return (
    <Command className="bg-transparent">
      <CommandInput placeholder="Search for a language" />
      <CommandList>
        <CommandEmpty>No languages found</CommandEmpty>
        <CommandGroup>
          <CommandItem
            onSelect={() => {
              setLanguage(ALL_LANGUAGES_QUERY_VALUE);
              onClose();
            }}
            data-testid="language-select-all-languages"
            value={ALL_LANGUAGES_QUERY_VALUE}
          >
            <LanguageIndicator language={ALL_LANGUAGES_LABEL} />
            {ALL_LANGUAGES_LABEL}
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
              data-testid={`language-select-${language}`}
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
              data-testid={`language-select-${language}`}
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
  const chevronDownRef = useRef<ChevronDownIconHandle>(null);
  function Trigger(props: React.ComponentProps<typeof Button>) {
    const { onMouseEnter, onMouseLeave, onFocus, onBlur, ...buttonProps } =
      props;

    return (
      <Button
        {...buttonProps}
        className={className}
        onFocus={(event) => {
          onFocus?.(event);
          chevronDownRef.current?.startAnimation();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          chevronDownRef.current?.stopAnimation();
        }}
        variant="outline"
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          chevronDownRef.current?.startAnimation();
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          chevronDownRef.current?.stopAnimation();
        }}
      >
        <LanguageIndicator language={language} />
        {language}
        <ChevronDownIcon ref={chevronDownRef} />
      </Button>
    );
  }
  if (isMobile) {
    return (
      <Drawer onOpenChange={setDrawerOpen} open={drawerOpen}>
        <DrawerTrigger asChild>
          <Trigger {...props} />
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
      <PopoverTrigger render={<Trigger {...props} />} />
      <PopoverContent align="end" className="dark w-auto p-0">
        <LanguageSelectContent onClose={() => setPopoverOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};
