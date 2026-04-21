import { useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PersonalAccessTokenForm } from "@/components/personal-access-token-form";
import { Button } from "@/components/ui/button";
import {
  Cog6ToothIcon,
  type Cog6ToothIconHandle,
} from "@/components/ui/cog-6-tooth";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  ComputerDesktopIcon,
  type ComputerDesktopIconHandle,
} from "@/components/ui/computer-desktop";
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
import {
  LockClosedIcon,
  type LockClosedIconHandle,
} from "@/components/ui/lock-closed";
import { MoonIcon, type MoonIconHandle } from "@/components/ui/moon";
import { SunIcon, type SunIconHandle } from "@/components/ui/sun";
import { SwatchIcon, type SwatchIconHandle } from "@/components/ui/swatch";

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
  const cog6ToothRef = useRef<Cog6ToothIconHandle>(null);
  const lockClosedIconMobileRef = useRef<LockClosedIconHandle>(null);
  const lockClosedIconRef = useRef<LockClosedIconHandle>(null);
  const swatchIconMobileRef = useRef<SwatchIconHandle>(null);
  const swatchIconRef = useRef<SwatchIconHandle>(null);
  const moonIconMobileRef = useRef<MoonIconHandle>(null);
  const moonIconRef = useRef<MoonIconHandle>(null);
  const sunIconMobileRef = useRef<SunIconHandle>(null);
  const sunIconRef = useRef<SunIconHandle>(null);
  const computerDesktopIconMobileRef = useRef<ComputerDesktopIconHandle>(null);
  const computerDesktopIconRef = useRef<ComputerDesktopIconHandle>(null);
  function Trigger(props: React.ComponentProps<typeof Button>) {
    const { onMouseEnter, onMouseLeave, ...buttonProps } = props;

    return (
      <Button
        {...buttonProps}
        className={className}
        size="icon"
        variant="outline"
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          cog6ToothRef.current?.startAnimation();
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          cog6ToothRef.current?.stopAnimation();
        }}
      >
        <Cog6ToothIcon ref={cog6ToothRef} />
      </Button>
    );
  }
  if (isMobile) {
    return (
      <>
        <Drawer onOpenChange={setSettingsOpen} open={settingsOpen}>
          <DrawerTrigger asChild>
            <Trigger {...props} />
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
                  onMouseEnter={() =>
                    swatchIconMobileRef.current?.startAnimation()
                  }
                  onMouseLeave={() =>
                    swatchIconMobileRef.current?.stopAnimation()
                  }
                  onSelect={() => {
                    setSettingsOpen(false);
                    setThemeDrawerOpen(true);
                  }}
                >
                  <SwatchIcon ref={swatchIconMobileRef} />
                  <span>Theme</span>
                  <span
                    className="ml-auto text-muted-foreground text-xs capitalize"
                    data-slot="command-shortcut"
                  >
                    {theme}
                  </span>
                </CommandItem>
                <CommandItem
                  onMouseEnter={() => {
                    lockClosedIconMobileRef.current?.startAnimation();
                    cog6ToothRef.current?.startAnimation();
                  }}
                  onMouseLeave={() => {
                    lockClosedIconMobileRef.current?.stopAnimation();
                    cog6ToothRef.current?.stopAnimation();
                  }}
                  onSelect={() => {
                    setPatOpen(true);
                  }}
                >
                  <LockClosedIcon ref={lockClosedIconMobileRef} />
                  <span>Personal Access Token</span>
                  <Cog6ToothIcon
                    ref={cog6ToothRef}
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
                    onMouseEnter={() => {
                      if (value === "dark") {
                        moonIconMobileRef.current?.startAnimation();
                      } else if (value === "light") {
                        sunIconMobileRef.current?.startAnimation();
                      } else {
                        computerDesktopIconMobileRef.current?.startAnimation();
                      }
                    }}
                    onMouseLeave={() => {
                      if (value === "dark") {
                        moonIconMobileRef.current?.stopAnimation();
                      } else if (value === "light") {
                        sunIconMobileRef.current?.stopAnimation();
                      } else {
                        computerDesktopIconMobileRef.current?.stopAnimation();
                      }
                    }}
                    onSelect={() => {
                      setThemeServerFn({ data: value }).then(() => {
                        router.invalidate();
                        setThemeDrawerOpen(false);
                      });
                    }}
                  >
                    {value === "dark" && <MoonIcon ref={moonIconMobileRef} />}
                    {value === "light" && <SunIcon ref={sunIconMobileRef} />}
                    {value === "system" && (
                      <ComputerDesktopIcon ref={computerDesktopIconMobileRef} />
                    )}
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
        <DropdownMenuTrigger render={<Trigger {...props} />} />
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                onMouseEnter={() => swatchIconRef.current?.startAnimation()}
                onMouseLeave={() => swatchIconRef.current?.stopAnimation()}
              >
                <SwatchIcon ref={swatchIconRef} />
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
                      onMouseEnter={() => {
                        if (value === "dark") {
                          moonIconRef.current?.startAnimation();
                        } else if (value === "light") {
                          sunIconRef.current?.startAnimation();
                        } else {
                          computerDesktopIconRef.current?.startAnimation();
                        }
                      }}
                      onMouseLeave={() => {
                        if (value === "dark") {
                          moonIconRef.current?.stopAnimation();
                        } else if (value === "light") {
                          sunIconRef.current?.stopAnimation();
                        } else {
                          computerDesktopIconRef.current?.stopAnimation();
                        }
                      }}
                    >
                      {value === "dark" && <MoonIcon ref={moonIconRef} />}
                      {value === "light" && <SunIcon ref={sunIconRef} />}
                      {value === "system" && (
                        <ComputerDesktopIcon ref={computerDesktopIconRef} />
                      )}
                      {value}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DialogTrigger
              render={
                <DropdownMenuItem
                  onMouseEnter={() =>
                    lockClosedIconRef.current?.startAnimation()
                  }
                  onMouseLeave={() =>
                    lockClosedIconRef.current?.stopAnimation()
                  }
                >
                  <LockClosedIcon ref={lockClosedIconRef} />
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
