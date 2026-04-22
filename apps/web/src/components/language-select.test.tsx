import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createStore, Provider as JotaiProvider } from "jotai";
import { withNuqsTestingAdapter } from "nuqs/adapters/testing";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { languageAtom } from "@/atoms/language";
import { LanguageSelect } from "./language-select";

type AdapterProps = Parameters<typeof withNuqsTestingAdapter>[0];

// Each test gets a fresh Jotai store. We also pre-seed the language atom from
// the current localStorage value before render: jotai's atomWithStorage
// captures its initial value when the module is first loaded, so a per-test
// `localStorage.setItem(...)` would otherwise be ignored on the very first
// render — letting the URL <-> localStorage sync effect overwrite the value
// the test just set with the stale fallback.
function createWrapper(adapterProps?: AdapterProps) {
  const NuqsWrapper = withNuqsTestingAdapter(adapterProps);
  const store = createStore();
  const stored = localStorage.getItem("language");
  if (stored !== null) {
    try {
      const parsed: unknown = JSON.parse(stored);
      if (typeof parsed === "string") {
        store.set(languageAtom, parsed);
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
  localStorage.clear();
  useMediaQueryMock.mockReturnValue(false);
  chevronStartAnimationMock.mockClear();
  chevronStopAnimationMock.mockClear();
});

describe("LanguageSelect", () => {
  it("renders with current language in the button", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect data-testid="language-select" />, {
      wrapper: createWrapper(),
    });

    // Current language appears in the button trigger
    const indicators = screen.getAllByTestId("language-indicator");
    expect(indicators.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
  });

  it("renders the All Languages option", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: createWrapper() });

    const allLanguagesElements = screen.getAllByText("All Languages");
    expect(allLanguagesElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders popular and other language groups", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: createWrapper() });

    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  it("renders popular languages list", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: createWrapper() });

    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("JavaScript").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Python").length).toBeGreaterThanOrEqual(1);
  });

  it("renders other languages list", () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));

    render(<LanguageSelect />, { wrapper: createWrapper() });

    expect(screen.getAllByText("Java").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Kotlin").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Swift").length).toBeGreaterThanOrEqual(1);
  });

  it("starts and stops the chevron animation on hover, focus and blur", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect data-testid="language-select" />, {
      wrapper: createWrapper(),
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

    render(<LanguageSelect />, { wrapper: createWrapper() });

    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("Select your language")).toBeInTheDocument();
    expect(screen.getAllByText("All Languages").length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it("selects the All Languages option and persists the canonical query value", async () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));
    const onUrlUpdate = vi.fn();

    render(<LanguageSelect />, {
      wrapper: createWrapper({ onUrlUpdate }),
    });

    const allLanguagesItems = screen
      .getAllByText("All Languages")
      .map((node) => node.closest("button"))
      .filter((node): node is HTMLButtonElement => node !== null);
    expect(allLanguagesItems.length).toBeGreaterThanOrEqual(1);

    const target = allLanguagesItems[0];
    if (target) {
      fireEvent.click(target);
    }

    // The URL is updated with the canonical "all" query value. Note: the
    // local-storage sync effect then refreshes the `useQueryState` default,
    // after which nuqs may clear the param from the URL because it equals the
    // new default — so we look across all updates for the canonical value.
    await waitFor(() => {
      const updates = onUrlUpdate.mock.calls
        .map(([event]) => event?.searchParams.get("language"))
        .filter((value): value is string => typeof value === "string");
      expect(updates).toContain("all");
    });
    // ...and local storage stays in sync with that same canonical value.
    expect(localStorage.getItem("language")).toBe(JSON.stringify("all"));
  });

  it("selects a popular language and keeps URL state and local storage in sync", async () => {
    localStorage.setItem("language", JSON.stringify("All Languages"));
    const onUrlUpdate = vi.fn();

    render(<LanguageSelect />, {
      wrapper: createWrapper({ onUrlUpdate }),
    });

    const tsButtons = screen
      .getAllByText("TypeScript")
      .map((node) => node.closest("button"))
      .filter((node): node is HTMLButtonElement => node !== null);
    expect(tsButtons.length).toBeGreaterThanOrEqual(1);

    const target = tsButtons[0];
    if (target) {
      fireEvent.click(target);
    }

    await waitFor(() => {
      const updates = onUrlUpdate.mock.calls
        .map(([event]) => event?.searchParams.get("language"))
        .filter((value): value is string => typeof value === "string");
      expect(updates).toContain("TypeScript");
    });
    expect(localStorage.getItem("language")).toBe(JSON.stringify("TypeScript"));
  });

  it("syncs local storage to the URL query value on mount (simulates navigate.back)", () => {
    // Local storage starts on one value, but the URL we land on (e.g. via the
    // browser back button) carries a different language. After mount the
    // component must mirror whatever the URL says, so the two stay aligned.
    // We use "JavaScript" because it is present in the mocked language set
    // (`parseAsStringEnum` would reject anything else and fall back).
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect />, {
      wrapper: createWrapper({ searchParams: "?language=JavaScript" }),
    });

    expect(localStorage.getItem("language")).toBe(JSON.stringify("JavaScript"));
  });

  it("syncs local storage to the canonical 'all' value when navigating back to the All Languages URL", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect />, {
      wrapper: createWrapper({ searchParams: "?language=all" }),
    });

    expect(localStorage.getItem("language")).toBe(JSON.stringify("all"));
  });

  it("leaves local storage unchanged when navigating back to a URL without a language query", () => {
    localStorage.setItem("language", JSON.stringify("TypeScript"));

    render(<LanguageSelect />, {
      wrapper: createWrapper({ searchParams: "" }),
    });

    expect(localStorage.getItem("language")).toBe(JSON.stringify("TypeScript"));
  });
});
