import { useRouter } from "@tanstack/react-router";
import { Check, Key, Moon, Settings } from "lucide-react";
import { useState } from "react";

import { PersonalAccessTokenForm } from "@/components/personal-access-token-form";
import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { setThemeServerFn } from "@/lib/theme";
import { Route } from "@/routes/__root";

export function SettingsDropdown({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { theme } = Route.useLoaderData();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);
  const [patOpen, setPatOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) {
    return (
      <>
        <Drawer open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className={className}
              size="icon"
              {...props}
            >
              <Settings />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <Command className="bg-transparent">
              <CommandList>
                <CommandItem
                  onSelect={() => {
                    setSettingsOpen(false);
                    setThemeDrawerOpen(true);
                  }}
                >
                  <Moon />
                  <span>Theme</span>
                  <span className="ml-auto text-xs text-muted-foreground capitalize">
                    {theme}
                  </span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setSettingsOpen(false);
                    setPatOpen(true);
                  }}
                >
                  <Key />
                  <span>Personal Access Token</span>
                </CommandItem>
              </CommandList>
            </Command>
          </DrawerContent>
        </Drawer>

        <Drawer open={themeDrawerOpen} onOpenChange={setThemeDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Theme</DrawerTitle>
              <DrawerDescription>
                Choose how Twending should follow your appearance.
              </DrawerDescription>
            </DrawerHeader>
            <Command className="bg-transparent">
              <CommandList>
                {(["light", "dark", "system"] as const).map((value) => (
                  <CommandItem
                    key={value}
                    onSelect={() => {
                      setThemeServerFn({ data: value }).then(() => {
                        router.invalidate();
                        setThemeDrawerOpen(false);
                      });
                    }}
                  >
                    <Moon />
                    <span className="capitalize">{value}</span>
                    {theme === value ? (
                      <Check className="ml-auto size-4" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </DrawerContent>
        </Drawer>

        <Drawer open={patOpen} onOpenChange={setPatOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>
                Setup a personal access token
                <a
                  href="https://github.com/settings/personal-access-tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </DrawerDescription>
            </DrawerHeader>
            <PersonalAccessTokenForm onClose={() => setPatOpen(false)} />
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  return (
    <Dialog open={patOpen} onOpenChange={setPatOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={className}
            size="icon"
            {...props}
          >
            <Settings />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Moon />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => {
                  setThemeServerFn({
                    data: value as "light" | "dark" | "system",
                  }).then(() => {
                    router.invalidate();
                  });
                }}
              >
                {(["light", "dark", "system"] as const).map((value) => (
                  <DropdownMenuRadioItem
                    key={value}
                    value={value}
                    className="capitalize"
                  >
                    {value}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Key />
              <span>Personal Access Token</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Personal Access Token</DialogTitle>
          <DialogDescription>
            Setup a personal access token
            <a
              className="mx-0.5"
              href="https://github.com/settings/personal-access-tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </DialogDescription>
        </DialogHeader>
        <PersonalAccessTokenForm onClose={() => setPatOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
