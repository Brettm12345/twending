import { CalendarDays, ChevronDown } from "lucide-react";

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
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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

function PeriodSelectContent() {
  const setPeriod = useSetPeriod();
  return (
    <Command className="bg-transparent">
      <CommandInput placeholder="Search for a period" />
      <CommandList>
        <CommandEmpty>No periods found</CommandEmpty>
        <CommandGroup heading="Period">
          {periods.map((p) => (
            <CommandItem
              key={p.value}
              value={p.value}
              onSelect={() => setPeriod(p.value)}
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
  const setPeriod = useSetPeriod();
  const currentPeriod = periods.find((p) => p.value === period);
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline" className={className} {...props}>
            <CalendarDays />
            {currentPeriod?.label ?? "Daily"}
            <ChevronDown />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <PeriodSelectContent />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className={className} {...props}>
          <CalendarDays />
          {currentPeriod?.label ?? "Daily"}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Command>
          <CommandInput placeholder="Search for a period" />
          <CommandList>
            <CommandEmpty>No periods found</CommandEmpty>
            <CommandGroup heading="Period">
              {periods.map((p) => (
                <CommandItem
                  key={p.value}
                  value={p.value}
                  onSelect={() => setPeriod(p.value)}
                >
                  {p.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
