import {
  RiComputerLine,
  RiLock2Line,
  RiMoonLine,
  RiSettings2Line,
  RiSunLine,
} from "@remixicon/react";
import { useRouter } from "@tanstack/react-router";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
        <Drawer onOpenChange={setSettingsOpen} open={settingsOpen}>
          <DrawerTrigger asChild>
            <Button
              className={className}
              size="icon"
              variant="outline"
              {...props}
            >
              <RiSettings2Line />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>
                Manage your settings and preferences.
              </DrawerDescription>
            </DrawerHeader>
            <Command className="bg-transparent">
              <CommandList>
                <CommandItem
                  onSelect={() => {
                    setSettingsOpen(false);
                    setThemeDrawerOpen(true);
                  }}
                >
                  <RiMoonLine />
                  <span>Theme</span>
                  <span
                    className="ml-auto text-muted-foreground text-xs capitalize"
                    data-slot="command-shortcut"
                  >
                    {theme}
                  </span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPatOpen(true);
                  }}
                >
                  <RiLock2Line />
                  <span>Personal Access Token</span>
                  <RiSettings2Line
                    className="ml-auto text-muted-foreground text-xs capitalize"
                    data-slot="command-shortcut"
                  />
                </CommandItem>
              </CommandList>
            </Command>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer onOpenChange={setThemeDrawerOpen} open={themeDrawerOpen}>
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
                    data-checked={theme === value}
                    key={value}
                    onSelect={() => {
                      setThemeServerFn({ data: value }).then(() => {
                        router.invalidate();
                        setThemeDrawerOpen(false);
                      });
                    }}
                  >
                    {value === "dark" && <RiMoonLine />}
                    {value === "light" && <RiSunLine />}
                    {value === "system" && <RiComputerLine />}
                    <span className="capitalize">{value}</span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer onOpenChange={setPatOpen} open={patOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Personal Access Token</DrawerTitle>
              <DrawerDescription>
                Setup a personal access token
                <a
                  href="https://github.com/settings/personal-access-tokens"
                  rel="noopener noreferrer"
                  target="_blank"
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
    <Dialog onOpenChange={setPatOpen} open={patOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className={className}
              size="icon"
              variant="outline"
              {...props}
            >
              <RiSettings2Line />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <RiMoonLine />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  onValueChange={(value) => {
                    setThemeServerFn({
                      data: value as "light" | "dark" | "system",
                    }).then(() => {
                      router.invalidate();
                    });
                  }}
                  value={theme}
                >
                  {(["light", "dark", "system"] as const).map((value) => (
                    <DropdownMenuRadioItem
                      className="capitalize"
                      key={value}
                      value={value}
                    >
                      {value === "dark" && <RiMoonLine />}
                      {value === "light" && <RiSunLine />}
                      {value === "system" && <RiComputerLine />}
                      {value}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DialogTrigger
              render={
                <DropdownMenuItem>
                  <RiLock2Line />
                  Personal Access Token
                </DropdownMenuItem>
              }
            />
          </DropdownMenuGroup>
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
              rel="noopener noreferrer"
              target="_blank"
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
