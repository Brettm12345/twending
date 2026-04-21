import type { HugeiconsIcon } from "@hugeicons/react";
import { render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import type { ComponentProps, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { PeriodSelect } from "./period-select";

vi.mock("@hugeicons/core-free-icons", () => ({
  ArrowDownIcon: () => <span data-testid="arrow-icon" />,
  CalendarIcon: () => <span data-testid="calendar-icon" />,
}));

vi.mock("@hugeicons/react", () => ({
  HugeiconsIcon: ({ icon: Icon }: { icon: HugeiconsIcon }) => <Icon />,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: ComponentProps<"button"> & { children: ReactNode }) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/command", () => ({
  Command: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CommandEmpty: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  CommandGroup: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  CommandInput: () => <input placeholder="Search" />,
  CommandItem: ({
    children,
    onSelect,
  }: {
    children: ReactNode;
    onSelect?: () => void;
  }) => (
    <button onClick={onSelect} type="button">
      {children}
    </button>
  ),
  CommandList: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/drawer", () => ({
  Drawer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DrawerContent: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerDescription: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerHeader: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerTitle: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DrawerTrigger: ({ children }: { asChild?: boolean; children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/popover", () => ({
  Popover: ({ children, open }: { children: ReactNode; open: boolean }) => (
    <div data-open={open}>{children}</div>
  ),
  PopoverContent: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  PopoverTrigger: ({ render }: { render: ReactNode }) => <div>{render}</div>,
}));

vi.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: vi.fn(() => false),
}));

function Wrapper({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

describe("PeriodSelect", () => {
  it("renders with current period label in the button", () => {
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect data-testid="period-select" />, { wrapper: Wrapper });

    // Daily appears both in button and dropdown
    const dailyElements = screen.getAllByText("Daily");
    expect(dailyElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });

  it("renders all period options in dropdown", () => {
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect />, { wrapper: Wrapper });

    // All periods appear in the dropdown options
    expect(screen.getAllByText("Daily").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Weekly").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Monthly").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Yearly").length).toBeGreaterThanOrEqual(1);
  });

  it("renders with weekly period when selected", () => {
    localStorage.setItem("period", JSON.stringify("weekly"));

    render(<PeriodSelect />, { wrapper: Wrapper });

    const weeklyButtons = screen.getAllByText("Weekly");
    // At least one in the trigger button and one in the dropdown
    expect(weeklyButtons.length).toBeGreaterThanOrEqual(2);
  });
});
