import { ArrowDownIcon, CalendarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { usePeriodValue, useSetPeriod } from "@/atoms/period";
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

const periods = [
  { value: "daily", label: "Daily" } as const,
  { value: "weekly", label: "Weekly" } as const,
  { value: "monthly", label: "Monthly" } as const,
  { value: "yearly", label: "Yearly" } as const,
];

function PeriodSelectContent({ onClose }: { onClose: () => void }) {
  const period = usePeriodValue();
  const setPeriod = useSetPeriod();
  return (
    <Command className="bg-transparent" value={period}>
      <CommandInput placeholder="Search for a period" />
      <CommandList>
        <CommandEmpty>No periods found</CommandEmpty>
        <CommandGroup heading="Period">
          {periods.map((p) => (
            <CommandItem
              key={p.value}
              onSelect={() => {
                setPeriod(p.value);
                onClose();
              }}
              value={p.value}
            >
              {p.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function PeriodSelect({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const period = usePeriodValue();
  const currentPeriod = periods.find((p) => p.value === period);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  if (isMobile) {
    return (
      <Drawer onOpenChange={setDrawerOpen} open={drawerOpen}>
        <DrawerTrigger asChild>
          <Button className={className} variant="outline" {...props}>
            <HugeiconsIcon icon={CalendarIcon} />
            {currentPeriod?.label ?? "Daily"}
            <HugeiconsIcon icon={ArrowDownIcon} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Period</DrawerTitle>
            <DrawerDescription>Select your period</DrawerDescription>
          </DrawerHeader>
          <PeriodSelectContent onClose={() => setDrawerOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
      <PopoverTrigger
        render={
          <Button className={className} variant="outline" {...props}>
            <HugeiconsIcon icon={CalendarIcon} />
            {currentPeriod?.label ?? "Daily"}
            <HugeiconsIcon icon={ArrowDownIcon} />
          </Button>
        }
      />
      <PopoverContent align="end" className="w-auto p-0">
        <PeriodSelectContent onClose={() => setPopoverOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
