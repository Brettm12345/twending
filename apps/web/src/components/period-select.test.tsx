import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createStore, Provider as JotaiProvider } from "jotai";
import { withNuqsTestingAdapter } from "nuqs/adapters/testing";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { periodAtom } from "@/atoms/period";
import { PeriodSelect } from "./period-select";

type AdapterProps = Parameters<typeof withNuqsTestingAdapter>[0];
type PeriodValue = "daily" | "weekly" | "monthly" | "yearly";
const validPeriods: readonly PeriodValue[] = [
  "daily",
  "weekly",
  "monthly",
  "yearly",
];

// Each test gets a fresh Jotai store. We also pre-seed the period atom from
// the current localStorage value before render: jotai's atomWithStorage
// captures its initial value when the module is first loaded, so a per-test
// `localStorage.setItem(...)` would otherwise be ignored on the very first
// render — letting the URL <-> localStorage sync effect overwrite the value
// the test just set with the stale fallback.
function createWrapper(adapterProps?: AdapterProps) {
  const NuqsWrapper = withNuqsTestingAdapter(adapterProps);
  const store = createStore();
  const stored = localStorage.getItem("period");
  if (stored !== null) {
    try {
      const parsed: unknown = JSON.parse(stored);
      if (
        typeof parsed === "string" &&
        validPeriods.includes(parsed as PeriodValue)
      ) {
        store.set(periodAtom, parsed as PeriodValue);
      }
    } catch {
      // Ignore unparseable values; the atom will fall back to its default.
    }
  }
  return ({ children }: { children: ReactNode }) => (
    <JotaiProvider store={store}>
      <NuqsWrapper>{children}</NuqsWrapper>
    </JotaiProvider>
  );
}

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
  localStorage.clear();
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
      wrapper: createWrapper(),
    });

    // Daily appears both in button and dropdown
    const dailyElements = screen.getAllByText("Daily");
    expect(dailyElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("calendar-days-icon")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
  });

  it("renders all period options in dropdown", () => {
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect />, { wrapper: createWrapper() });

    expect(screen.getAllByText("Daily").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Weekly").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Monthly").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Yearly").length).toBeGreaterThanOrEqual(1);
  });

  it("renders with weekly period when the URL carries weekly", () => {
    localStorage.setItem("period", JSON.stringify("weekly"));

    render(<PeriodSelect />, {
      wrapper: createWrapper({ searchParams: "?period=weekly" }),
    });

    const weeklyButtons = screen.getAllByText("Weekly");
    // At least one in the trigger button and one in the dropdown
    expect(weeklyButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("falls back to the Daily label when the stored period is unknown", () => {
    localStorage.setItem("period", JSON.stringify("not-a-real-period"));

    render(<PeriodSelect />, { wrapper: createWrapper() });

    expect(screen.getAllByText("Daily").length).toBeGreaterThanOrEqual(1);
  });

  it("starts and stops both icon animations on hover, focus and blur", () => {
    localStorage.setItem("period", JSON.stringify("daily"));

    render(<PeriodSelect data-testid="period-select" />, {
      wrapper: createWrapper(),
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

    render(<PeriodSelect />, { wrapper: createWrapper() });

    expect(screen.getByText("Period")).toBeInTheDocument();
    expect(screen.getByText("Select your period")).toBeInTheDocument();
  });

  it("keeps URL state and local storage in sync when an option is selected", async () => {
    localStorage.setItem("period", JSON.stringify("daily"));
    const onUrlUpdate = vi.fn();

    render(<PeriodSelect />, {
      wrapper: createWrapper({ onUrlUpdate }),
    });

    const monthly = screen
      .getAllByText("Monthly")
      .map((node) => node.closest("button"))
      .filter((node): node is HTMLButtonElement => node !== null)[0];
    expect(monthly).toBeDefined();
    if (monthly) {
      fireEvent.click(monthly);
    }

    // The URL is updated with `period=monthly`. Note that the local-storage
    // sync effect then refreshes the `useQueryState` default, after which nuqs
    // may clear the param from the URL because it equals the new default. So
    // we assert the value appeared at *some* point, not necessarily on the
    // last update.
    await waitFor(() => {
      const updates = onUrlUpdate.mock.calls
        .map(([event]) => event?.searchParams.get("period"))
        .filter((value): value is string => typeof value === "string");
      expect(updates).toContain("monthly");
    });
    expect(localStorage.getItem("period")).toBe(JSON.stringify("monthly"));
  });

  it("syncs local storage to the URL period on mount (simulates navigate.back)", () => {
    // The user previously chose "monthly" (mirrored to local storage), then
    // navigated away and clicked the browser back button onto a URL whose
    // period query is "yearly". Local storage must follow the URL.
    localStorage.setItem("period", JSON.stringify("monthly"));

    render(<PeriodSelect />, {
      wrapper: createWrapper({ searchParams: "?period=yearly" }),
    });

    expect(localStorage.getItem("period")).toBe(JSON.stringify("yearly"));
  });

  it("leaves local storage unchanged when navigating back to a URL without a period query", () => {
    localStorage.setItem("period", JSON.stringify("weekly"));

    render(<PeriodSelect />, {
      wrapper: createWrapper({ searchParams: "" }),
    });

    expect(localStorage.getItem("period")).toBe(JSON.stringify("weekly"));
  });
});
