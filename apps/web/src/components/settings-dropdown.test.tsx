import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SettingsDropdown } from "./settings-dropdown";

const setThemeServerFnMock = vi.fn(
  (data: { data: "light" | "dark" | "system" }) => Promise.resolve(data),
);
const routerInvalidateMock = vi.fn();
const useLoaderDataMock = vi.fn(() => ({
  theme: "system" as "light" | "dark" | "system",
}));
const useMediaQueryMock = vi.fn(() => false);

vi.mock("@/routes/__root", () => ({
  Route: {
    useLoaderData: () => useLoaderDataMock(),
  },
}));

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ invalidate: routerInvalidateMock }),
}));

vi.mock("@/lib/theme", () => ({
  setThemeServerFn: (data: { data: "light" | "dark" | "system" }) =>
    setThemeServerFnMock(data),
}));

vi.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: () => useMediaQueryMock(),
}));

vi.mock("@/components/personal-access-token-form", () => ({
  PersonalAccessTokenForm: ({ onClose }: { onClose: () => void }) => (
    <button data-testid="pat-form" onClick={onClose} type="button">
      pat-form
    </button>
  ),
}));

vi.mock("@/components/ui/cog-6-tooth", () => ({
  Cog6ToothIcon: () => <span data-testid="cog-icon" />,
}));

vi.mock("@/components/ui/computer-desktop", () => ({
  ComputerDesktopIcon: () => <span data-testid="computer-desktop-icon" />,
}));

vi.mock("@/components/ui/lock-closed", () => ({
  LockClosedIcon: () => <span data-testid="lock-closed-icon" />,
}));

vi.mock("@/components/ui/moon", () => ({
  MoonIcon: () => <span data-testid="moon-icon" />,
}));

vi.mock("@/components/ui/sun", () => ({
  SunIcon: () => <span data-testid="sun-icon" />,
}));

vi.mock("@/components/ui/swatch", () => ({
  SwatchIcon: () => <span data-testid="swatch-icon" />,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: ComponentProps<"button"> & { children?: ReactNode }) => (
    <button onClick={onClick} type="button" {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/command", () => ({
  Command: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CommandList: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CommandItem: ({
    children,
    onSelect,
    onMouseEnter,
    onMouseLeave,
  }: {
    children: ReactNode;
    onSelect?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }) => (
    <button
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type="button"
    >
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/drawer", () => ({
  Drawer: ({ children, open }: { children: ReactNode; open?: boolean }) => (
    <div data-open={open}>{children}</div>
  ),
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
  DrawerFooter: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerClose: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DrawerTrigger: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: { children: ReactNode; open?: boolean }) => (
    <div data-open={open}>{children}</div>
  ),
  DialogContent: ({ children }: { children: ReactNode }) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogDescription: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DialogHeader: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogTrigger: ({ render }: { render: ReactNode }) => <div>{render}</div>,
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: ReactNode }) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuGroup: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onMouseEnter,
    onMouseLeave,
  }: {
    children: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }) => (
    // biome-ignore lint/a11y/noStaticElementInteractions: Simplified for testing
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  ),
  DropdownMenuLabel: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuRadioGroup: ({
    children,
    onValueChange,
    value,
  }: {
    children: ReactNode;
    onValueChange?: (value: string) => void;
    value?: string;
  }) => (
    <div data-testid="theme-radio-group" data-value={value}>
      <button
        data-testid="select-light"
        onClick={() => onValueChange?.("light")}
        type="button"
      >
        select-light
      </button>
      <button
        data-testid="select-dark"
        onClick={() => onValueChange?.("dark")}
        type="button"
      >
        select-dark
      </button>
      <button
        data-testid="select-system"
        onClick={() => onValueChange?.("system")}
        type="button"
      >
        select-system
      </button>
      {children}
    </div>
  ),
  DropdownMenuRadioItem: ({
    children,
    value,
  }: {
    children: ReactNode;
    value?: string;
  }) => <div data-testid={`radio-item-${value}`}>{children}</div>,
  DropdownMenuSub: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuSubContent: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuSubTrigger: ({
    children,
    onMouseEnter,
    onMouseLeave,
  }: {
    children: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }) => (
    // biome-ignore lint/a11y/noStaticElementInteractions: Simplified for testing
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({ render }: { render: ReactNode }) => (
    <div>{render}</div>
  ),
}));

beforeEach(() => {
  setThemeServerFnMock.mockClear();
  setThemeServerFnMock.mockImplementation(() => Promise.resolve());
  routerInvalidateMock.mockClear();
  useLoaderDataMock.mockReturnValue({ theme: "system" });
  useMediaQueryMock.mockReturnValue(false);
});

describe("SettingsDropdown - desktop", () => {
  it("renders the trigger with the cog icon", () => {
    render(<SettingsDropdown data-testid="settings-trigger" />);

    expect(screen.getByTestId("cog-icon")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
  });

  it("renders the Settings label and Theme + Personal Access Token entries", () => {
    render(<SettingsDropdown />);

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getAllByText("Theme").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Personal Access Token").length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders all theme options inside the radio group", () => {
    render(<SettingsDropdown />);

    expect(screen.getByTestId("radio-item-light")).toBeInTheDocument();
    expect(screen.getByTestId("radio-item-dark")).toBeInTheDocument();
    expect(screen.getByTestId("radio-item-system")).toBeInTheDocument();
  });

  it("reflects the current theme value on the radio group", () => {
    useLoaderDataMock.mockReturnValue({ theme: "dark" });

    render(<SettingsDropdown />);

    expect(screen.getByTestId("theme-radio-group")).toHaveAttribute(
      "data-value",
      "dark",
    );
  });

  it("calls setThemeServerFn and invalidates router when a theme is chosen", async () => {
    render(<SettingsDropdown />);

    fireEvent.click(screen.getByTestId("radio-item-dark"));

    expect(setThemeServerFnMock).toHaveBeenCalledWith({ data: "dark" });

    await waitFor(() => {
      expect(routerInvalidateMock).toHaveBeenCalledOnce();
    });
  });

  it("renders the personal access token dialog content", () => {
    render(<SettingsDropdown />);

    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("pat-form")).toBeInTheDocument();
    expect(
      screen.getByText(/Setup a personal access token/i),
    ).toBeInTheDocument();
  });

  it("renders the GitHub PAT settings link with safe rel attributes", () => {
    render(<SettingsDropdown />);

    const link = screen.getByRole("link", { name: /here/i });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/settings/personal-access-tokens",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("SettingsDropdown - mobile", () => {
  beforeEach(() => {
    useMediaQueryMock.mockReturnValue(true);
  });

  it("renders the mobile drawer trigger with the cog icon", () => {
    render(<SettingsDropdown />);

    // Cog icon appears as the trigger and as the shortcut next to PAT entry
    expect(screen.getAllByTestId("cog-icon").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Settings drawer with Theme and Personal Access Token entries", () => {
    render(<SettingsDropdown />);

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your settings and preferences."),
    ).toBeInTheDocument();
    // Theme appears in the settings list and in the theme drawer header
    expect(screen.getAllByText("Theme").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Personal Access Token").length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("shows the current theme value next to the Theme entry", () => {
    useLoaderDataMock.mockReturnValue({ theme: "light" });

    render(<SettingsDropdown />);

    // "light" appears as the shortcut label and again in the theme options drawer
    expect(screen.getAllByText("light").length).toBeGreaterThanOrEqual(2);
  });

  it("renders all three theme options in the theme drawer", () => {
    render(<SettingsDropdown />);

    expect(screen.getAllByText("light").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("dark").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("system").length).toBeGreaterThanOrEqual(1);
  });

  it("opens the theme drawer when the Theme item is selected", () => {
    render(<SettingsDropdown />);

    // First "Theme" text is the settings list item; clicking it opens the theme drawer
    const themeLabels = screen.getAllByText("Theme");
    const themeItem = themeLabels[0]?.closest("button");
    expect(themeItem).not.toBeNull();
    if (themeItem) {
      fireEvent.click(themeItem);
    }

    expect(
      screen.getByText("Choose how Twending should follow your appearance."),
    ).toBeInTheDocument();
  });

  it("calls setThemeServerFn and invalidates the router when a mobile theme option is selected", async () => {
    render(<SettingsDropdown />);

    const lightOption = screen.getByText("light").closest("button");
    expect(lightOption).not.toBeNull();
    if (lightOption) {
      fireEvent.click(lightOption);
    }

    expect(setThemeServerFnMock).toHaveBeenCalledWith({ data: "light" });

    await waitFor(() => {
      expect(routerInvalidateMock).toHaveBeenCalledOnce();
    });
  });

  it("renders the mobile Personal Access Token drawer with the form", () => {
    render(<SettingsDropdown />);

    expect(screen.getByTestId("pat-form")).toBeInTheDocument();
    expect(
      screen.getAllByText(/Setup a personal access token/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders the GitHub PAT settings link in the mobile drawer", () => {
    render(<SettingsDropdown />);

    const links = screen.getAllByRole("link", { name: /here/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    for (const link of links) {
      expect(link).toHaveAttribute(
        "href",
        "https://github.com/settings/personal-access-tokens",
      );
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders Close buttons in each drawer", () => {
    render(<SettingsDropdown />);

    const closeButtons = screen.getAllByText("Close");
    // Settings and theme drawers have a close button; the PAT drawer does not
    expect(closeButtons.length).toBeGreaterThanOrEqual(2);
  });
});
