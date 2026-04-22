import { useAtom } from "jotai";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useRef, useState } from "react";
import { periodAtom, usePeriodValue } from "@/atoms/period";
import { Button } from "@/components/ui/button";
import {
  CalendarDaysIcon,
  type CalendarDaysIconHandle,
} from "@/components/ui/calendar-days";
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

const periods = [
  { value: "daily", label: "Daily" } as const,
  { value: "weekly", label: "Weekly" } as const,
  { value: "monthly", label: "Monthly" } as const,
  { value: "yearly", label: "Yearly" } as const,
];

function PeriodSelectContent({ onClose }: { onClose: () => void }) {
  const [periodLocalStorage, setPeriodLocalStorage] = useAtom(periodAtom);
  const [period, setPeriod] = useQueryState(
    "period",
    parseAsStringEnum(["daily", "weekly", "monthly", "yearly"]).withDefault(
      periodLocalStorage,
    ),
  );
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
                setPeriodLocalStorage(p.value);
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
  const calendarDaysRef = useRef<CalendarDaysIconHandle>(null);
  const chevronDownRef = useRef<ChevronDownIconHandle>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  function Trigger(props: React.ComponentProps<typeof Button>) {
    const { onMouseEnter, onMouseLeave, onFocus, onBlur, ...buttonProps } =
      props;

    return (
      <Button
        {...buttonProps}
        className={className}
        variant="outline"
        onMouseEnter={(event) => {
          calendarDaysRef.current?.startAnimation();
          chevronDownRef.current?.startAnimation();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          calendarDaysRef.current?.stopAnimation();
          chevronDownRef.current?.stopAnimation();
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          calendarDaysRef.current?.startAnimation();
          chevronDownRef.current?.startAnimation();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          calendarDaysRef.current?.stopAnimation();
          chevronDownRef.current?.stopAnimation();
        }}
      >
        <CalendarDaysIcon ref={calendarDaysRef} />
        {currentPeriod?.label ?? "Daily"}
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
      <PopoverTrigger render={<Trigger {...props} />} />
      <PopoverContent align="end" className="dark w-auto p-0">
        <PeriodSelectContent onClose={() => setPopoverOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
