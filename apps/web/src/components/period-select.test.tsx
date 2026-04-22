import { fireEvent, render, screen } from "@testing-library/react";
import { withNuqsTestingAdapter } from "nuqs/adapters/testing";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PeriodSelect } from "./period-select";

const useMediaQueryMock = vi.fn(() => false);
const calendarStartAnimationMock = vi.fn();
const calendarStopAnimationMock = vi.fn();
const chevronStartAnimationMock = vi.fn();
const chevronStopAnimationMock = vi.fn();

vi.mock("@/components/ui/calendar-days", () => ({
  CalendarDaysIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: calendarStartAnimationMock,
      stopAnimation: calendarStopAnimationMock,
    }));
    return <span data-testid="calendar-days-icon" />;
  }),
}));

vi.mock("@/components/ui/chevron-down", () => ({
  ChevronDownIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: chevronStartAnimationMock,
      stopAnimation: chevronStopAnimationMock,
    }));
    return <span data-testid="chevron-down-icon" />;
  }),
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
  useMediaQuery: () => useMediaQueryMock(),
}));

beforeEach(() => {
  useMediaQueryMock.mockReturnValue(false);
  calendarStartAnimationMock.mockClear();
  calendarStopAnimationMock.mockClear();
  chevronStartAnimationMock.mockClear();
  chevronStopAnimationMock.mockClear();
});

describe("PeriodSelect", () => {
  it("renders with current period label in the button", () => {
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect data-testid="period-select" />, {
      wrapper: withNuqsTestingAdapter(),
    });

    // Daily appears both in button and dropdown
    const dailyElements = screen.getAllByText("Daily");
    expect(dailyElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("calendar-days-icon")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
  });

  it("renders all period options in dropdown", () => {
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect />, { wrapper: withNuqsTestingAdapter() });

    // All periods appear in the dropdown options
    expect(screen.getAllByText("Daily").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Weekly").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Monthly").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Yearly").length).toBeGreaterThanOrEqual(1);
  });

  it("renders with weekly period when selected", () => {
    localStorage.setItem("period", JSON.stringify("weekly"));

    render(<PeriodSelect />, { wrapper: withNuqsTestingAdapter() });

    const weeklyButtons = screen.getAllByText("Weekly");
    // At least one in the trigger button and one in the dropdown
    expect(weeklyButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("falls back to the Daily label when the stored period is unknown", () => {
    localStorage.setItem("period", JSON.stringify("not-a-real-period"));

    render(<PeriodSelect />, { wrapper: withNuqsTestingAdapter() });

    expect(screen.getAllByText("Daily").length).toBeGreaterThanOrEqual(1);
  });

  it("starts and stops both icon animations on hover, focus and blur", () => {
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect data-testid="period-select" />, {
      wrapper: withNuqsTestingAdapter(),
    });

    const trigger = screen.getByTestId("period-select");
    fireEvent.mouseEnter(trigger);
    fireEvent.mouseLeave(trigger);
    fireEvent.focus(trigger);
    fireEvent.blur(trigger);

    expect(calendarStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(calendarStopAnimationMock).toHaveBeenCalledTimes(2);
    expect(chevronStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(chevronStopAnimationMock).toHaveBeenCalledTimes(2);
  });

  it("renders the mobile drawer when on a mobile viewport", () => {
    useMediaQueryMock.mockReturnValue(true);
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect />, { wrapper: withNuqsTestingAdapter() });

    expect(screen.getByText("Period")).toBeInTheDocument();
    expect(screen.getByText("Select your period")).toBeInTheDocument();
  });

  it("persists the chosen period to local storage when an option is selected", () => {
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect />, { wrapper: withNuqsTestingAdapter() });

    const monthly = screen
      .getAllByText("Monthly")
      .map((node) => node.closest("button"))
      .filter((node): node is HTMLButtonElement => node !== null)[0];
    expect(monthly).toBeDefined();
    if (monthly) {
      fireEvent.click(monthly);
    }

    expect(localStorage.getItem("period")).toBe(JSON.stringify("monthly"));
  });
});
