import { fireEvent, render, screen } from "@testing-library/react";
import { withNuqsTestingAdapter } from "nuqs/adapters/testing";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageSelect } from "./language-select";

const useMediaQueryMock = vi.fn(() => false);
const chevronStartAnimationMock = vi.fn();
const chevronStopAnimationMock = vi.fn();

vi.mock("@/components/ui/chevron-down", () => ({
  ChevronDownIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: chevronStartAnimationMock,
      stopAnimation: chevronStopAnimationMock,
    }));
    return <span data-testid="chevron-down-icon" />;
  }),
}));

vi.mock("@/components/language-indicator", () => ({
  LanguageIndicator: ({ language }: { language: string }) => (
    <span data-testid="language-indicator">{language}</span>
  ),
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
  CommandGroup: ({
    children,
    heading,
  }: {
    children: ReactNode;
    heading?: string;
  }) => (
    <div data-heading={heading}>
      {heading && <div>{heading}</div>}
      {children}
    </div>
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

vi.mock("@/lib/languages", () => ({
  languages: {
    popular: ["TypeScript", "JavaScript", "Python"],
    everythingElse: ["Java", "Kotlin", "Swift"],
    colors: {
      TypeScript: "#2b7489",
      JavaScript: "#f1e05a",
    },
  },
}));

beforeEach(() => {
  useMediaQueryMock.mockReturnValue(false);
  chevronStartAnimationMock.mockClear();
  chevronStopAnimationMock.mockClear();
});

describe("LanguageSelect", () => {
  it("renders with current language in the button", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect data-testid="language-select" />, {
      wrapper: withNuqsTestingAdapter(),
    });

    // Current language appears in the button trigger
    const indicators = screen.getAllByTestId("language-indicator");
    expect(indicators.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
  });

  it("renders the All Languages option", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: withNuqsTestingAdapter() });

    const allLanguagesElements = screen.getAllByText("All Languages");
    expect(allLanguagesElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders popular and other language groups", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: withNuqsTestingAdapter() });

    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  it("renders popular languages list", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: withNuqsTestingAdapter() });

    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("JavaScript").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Python").length).toBeGreaterThanOrEqual(1);
  });

  it("renders other languages list", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: withNuqsTestingAdapter() });

    expect(screen.getAllByText("Java").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Kotlin").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Swift").length).toBeGreaterThanOrEqual(1);
  });

  it("starts and stops the chevron animation on hover, focus and blur", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect data-testid="language-select" />, {
      wrapper: withNuqsTestingAdapter(),
    });

    const trigger = screen.getByTestId("language-select");
    fireEvent.mouseEnter(trigger);
    fireEvent.mouseLeave(trigger);
    fireEvent.focus(trigger);
    fireEvent.blur(trigger);

    expect(chevronStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(chevronStopAnimationMock).toHaveBeenCalledTimes(2);
  });

  it("renders the mobile drawer trigger and content when on a mobile viewport", () => {
    useMediaQueryMock.mockReturnValue(true);
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect />, { wrapper: withNuqsTestingAdapter() });

    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("Select your language")).toBeInTheDocument();
    expect(screen.getAllByText("All Languages").length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it("selects the All Languages option without throwing", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect />, { wrapper: withNuqsTestingAdapter() });

    const allLanguagesItems = screen
      .getAllByText("All Languages")
      .map((node) => node.closest("button"))
      .filter((node): node is HTMLButtonElement => node !== null);
    expect(allLanguagesItems.length).toBeGreaterThanOrEqual(1);

    const target = allLanguagesItems[0];
    if (target) {
      fireEvent.click(target);
    }

    expect(localStorage.getItem("language")).toBe(
      JSON.stringify("All Languages"),
    );
  });

  it("selects a popular language and persists it to local storage", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: withNuqsTestingAdapter() });

    const tsButtons = screen
      .getAllByText("TypeScript")
      .map((node) => node.closest("button"))
      .filter((node): node is HTMLButtonElement => node !== null);
    expect(tsButtons.length).toBeGreaterThanOrEqual(1);

    const target = tsButtons[0];
    if (target) {
      fireEvent.click(target);
    }

    expect(localStorage.getItem("language")).toBe(JSON.stringify("TypeScript"));
  });
});
