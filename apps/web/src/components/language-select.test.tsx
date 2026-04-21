import { render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import type { ComponentProps, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { LanguageSelect } from "./language-select";

vi.mock("@remixicon/react", () => ({
  RiArrowDownSLine: () => <span data-testid="arrow-icon" />,
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
  useMediaQuery: vi.fn(() => false),
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

function Wrapper({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

describe("LanguageSelect", () => {
  it("renders with current language in the button", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect data-testid="language-select" />, {
      wrapper: Wrapper,
    });

    // Current language appears in the button trigger
    const indicators = screen.getAllByTestId("language-indicator");
    expect(indicators.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });

  it("renders the All Languages option", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: Wrapper });

    const allLanguagesElements = screen.getAllByText("All Languages");
    expect(allLanguagesElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders popular and other language groups", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: Wrapper });

    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  it("renders popular languages list", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: Wrapper });

    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("JavaScript").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Python").length).toBeGreaterThanOrEqual(1);
  });

  it("renders other languages list", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: Wrapper });

    expect(screen.getAllByText("Java").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Kotlin").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Swift").length).toBeGreaterThanOrEqual(1);
  });
});
