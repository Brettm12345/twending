import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef, useImperativeHandle } from "react";
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
let mockRadioGroupValueChangeHandler: ((value: string) => void) | undefined;
const cogStartAnimationMock = vi.fn();
const cogStopAnimationMock = vi.fn();
const swatchStartAnimationMock = vi.fn();
const swatchStopAnimationMock = vi.fn();
const lockStartAnimationMock = vi.fn();
const lockStopAnimationMock = vi.fn();
const moonStartAnimationMock = vi.fn();
const moonStopAnimationMock = vi.fn();
const sunStartAnimationMock = vi.fn();
const sunStopAnimationMock = vi.fn();
const computerStartAnimationMock = vi.fn();
const computerStopAnimationMock = vi.fn();

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
  Cog6ToothIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: cogStartAnimationMock,
      stopAnimation: cogStopAnimationMock,
    }));
    return <span data-testid="cog-icon" />;
  }),
}));

vi.mock("@/components/ui/computer-desktop", () => ({
  ComputerDesktopIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: computerStartAnimationMock,
      stopAnimation: computerStopAnimationMock,
    }));
    return <span data-testid="computer-desktop-icon" />;
  }),
}));

vi.mock("@/components/ui/lock-closed", () => ({
  LockClosedIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: lockStartAnimationMock,
      stopAnimation: lockStopAnimationMock,
    }));
    return <span data-testid="lock-closed-icon" />;
  }),
}));

vi.mock("@/components/ui/moon", () => ({
  MoonIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: moonStartAnimationMock,
      stopAnimation: moonStopAnimationMock,
    }));
    return <span data-testid="moon-icon" />;
  }),
}));

vi.mock("@/components/ui/sun", () => ({
  SunIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: sunStartAnimationMock,
      stopAnimation: sunStopAnimationMock,
    }));
    return <span data-testid="sun-icon" />;
  }),
}));

vi.mock("@/components/ui/swatch", () => ({
  SwatchIcon: forwardRef((_, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: swatchStartAnimationMock,
      stopAnimation: swatchStopAnimationMock,
    }));
    return <span data-testid="swatch-icon" />;
  }),
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
    onFocus,
    onBlur,
  }: {
    children: ReactNode;
    onSelect?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
  }) => (
    <button
      onBlur={onBlur}
      onClick={onSelect}
      onFocus={onFocus}
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
  DialogTrigger: ({
    render,
    onFocus,
    onBlur,
  }: {
    render: ReactNode;
    onFocus?: () => void;
    onBlur?: () => void;
  }) => (
    <button
      data-testid="dialog-trigger"
      onBlur={onBlur}
      onFocus={onFocus}
      type="button"
    >
      {render}
    </button>
  ),
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
  }) => {
    mockRadioGroupValueChangeHandler = onValueChange;
    return (
      <div data-testid="theme-radio-group" data-value={value}>
        {children}
      </div>
    );
  },
  DropdownMenuRadioItem: ({
    children,
    value,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
  }: {
    children: ReactNode;
    value?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
  }) => (
    <button
      data-testid={`radio-item-${value}`}
      onBlur={onBlur}
      onClick={() => {
        if (value === undefined) {
          throw new Error(
            "DropdownMenuRadioItem requires a value in this test",
          );
        }
        mockRadioGroupValueChangeHandler?.(value);
      }}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type="button"
    >
      {children}
    </button>
  ),
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
    onFocus,
    onBlur,
  }: {
    children: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
  }) => (
    <button
      data-testid="theme-submenu-trigger"
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type="button"
    >
      {children}
    </button>
  ),
  DropdownMenuTrigger: ({ render }: { render: ReactNode }) => (
    <div>{render}</div>
  ),
}));

beforeEach(() => {
  setThemeServerFnMock.mockClear();
  setThemeServerFnMock.mockImplementation(() =>
    Promise.resolve({ data: "system" }),
  );
  routerInvalidateMock.mockClear();
  cogStartAnimationMock.mockClear();
  cogStopAnimationMock.mockClear();
  swatchStartAnimationMock.mockClear();
  swatchStopAnimationMock.mockClear();
  lockStartAnimationMock.mockClear();
  lockStopAnimationMock.mockClear();
  moonStartAnimationMock.mockClear();
  moonStopAnimationMock.mockClear();
  sunStartAnimationMock.mockClear();
  sunStopAnimationMock.mockClear();
  computerStartAnimationMock.mockClear();
  computerStopAnimationMock.mockClear();
  useLoaderDataMock.mockReturnValue({ theme: "system" });
  useMediaQueryMock.mockReturnValue(false);
  mockRadioGroupValueChangeHandler = undefined;
});

describe("SettingsDropdown - desktop", () => {
  it("renders the trigger with the cog icon", () => {
    render(<SettingsDropdown data-testid="settings-trigger" />);

    expect(screen.getByTestId("cog-icon")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
  });

  it("starts and stops trigger icon animation on focus and blur", () => {
    render(<SettingsDropdown data-testid="settings-trigger" />);

    const trigger = screen.getByTestId("settings-trigger");
    fireEvent.focus(trigger);
    fireEvent.blur(trigger);

    expect(cogStartAnimationMock).toHaveBeenCalledOnce();
    expect(cogStopAnimationMock).toHaveBeenCalledOnce();
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

  it("animates the swatch icon when hovering or focusing the theme submenu trigger", () => {
    render(<SettingsDropdown />);

    const submenuTrigger = screen.getByTestId("theme-submenu-trigger");
    fireEvent.mouseEnter(submenuTrigger);
    fireEvent.mouseLeave(submenuTrigger);
    fireEvent.focus(submenuTrigger);
    fireEvent.blur(submenuTrigger);

    expect(swatchStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(swatchStopAnimationMock).toHaveBeenCalledTimes(2);
  });

  it("animates the moon icon when hovering or focusing the dark theme radio item", () => {
    render(<SettingsDropdown />);

    const darkItem = screen.getByTestId("radio-item-dark");
    fireEvent.mouseEnter(darkItem);
    fireEvent.mouseLeave(darkItem);
    fireEvent.focus(darkItem);
    fireEvent.blur(darkItem);

    expect(moonStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(moonStopAnimationMock).toHaveBeenCalledTimes(2);
  });

  it("animates the sun icon when hovering or focusing the light theme radio item", () => {
    render(<SettingsDropdown />);

    const lightItem = screen.getByTestId("radio-item-light");
    fireEvent.mouseEnter(lightItem);
    fireEvent.mouseLeave(lightItem);
    fireEvent.focus(lightItem);
    fireEvent.blur(lightItem);

    expect(sunStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(sunStopAnimationMock).toHaveBeenCalledTimes(2);
  });

  it("animates the computer-desktop icon when hovering or focusing the system theme radio item", () => {
    render(<SettingsDropdown />);

    const systemItem = screen.getByTestId("radio-item-system");
    fireEvent.mouseEnter(systemItem);
    fireEvent.mouseLeave(systemItem);
    fireEvent.focus(systemItem);
    fireEvent.blur(systemItem);

    expect(computerStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(computerStopAnimationMock).toHaveBeenCalledTimes(2);
  });

  it("animates the lock icon when hovering or focusing the personal access token entry", () => {
    render(<SettingsDropdown />);

    const dialogTrigger = screen.getByTestId("dialog-trigger");
    fireEvent.focus(dialogTrigger);
    fireEvent.blur(dialogTrigger);

    expect(lockStartAnimationMock).toHaveBeenCalledTimes(1);
    expect(lockStopAnimationMock).toHaveBeenCalledTimes(1);
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

    const themeDescription = screen.getByText(
      "Choose how Twending should follow your appearance.",
    );
    expect(themeDescription.closest("[data-open]")).toHaveAttribute(
      "data-open",
      "false",
    );

    // First "Theme" text is the settings list item; clicking it opens the theme drawer
    const themeLabels = screen.getAllByText("Theme");
    const themeItem = themeLabels[0]?.closest("button");
    expect(themeItem).not.toBeNull();
    if (themeItem) {
      fireEvent.click(themeItem);
    }

    expect(themeDescription.closest("[data-open]")).toHaveAttribute(
      "data-open",
      "true",
    );
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

  it("animates the swatch and lock icons when hovering the corresponding settings entries", () => {
    render(<SettingsDropdown />);

    const themeEntry = screen.getAllByText("Theme")[0]?.closest("button");
    const patEntry = screen
      .getAllByText("Personal Access Token")[0]
      ?.closest("button");

    if (themeEntry) {
      fireEvent.mouseEnter(themeEntry);
      fireEvent.mouseLeave(themeEntry);
    }
    if (patEntry) {
      fireEvent.focus(patEntry);
      fireEvent.blur(patEntry);
    }

    expect(swatchStartAnimationMock).toHaveBeenCalled();
    expect(swatchStopAnimationMock).toHaveBeenCalled();
    expect(lockStartAnimationMock).toHaveBeenCalled();
    expect(lockStopAnimationMock).toHaveBeenCalled();
  });

  it("animates the moon icon when hovering the dark theme drawer option", () => {
    render(<SettingsDropdown />);

    const darkOption = screen.getByText("dark").closest("button");
    if (darkOption) {
      fireEvent.mouseEnter(darkOption);
      fireEvent.mouseLeave(darkOption);
      fireEvent.focus(darkOption);
      fireEvent.blur(darkOption);
    }

    expect(moonStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(moonStopAnimationMock).toHaveBeenCalledTimes(2);
  });

  it("animates the sun icon when hovering the light theme drawer option", () => {
    render(<SettingsDropdown />);

    const lightOption = screen.getByText("light").closest("button");
    if (lightOption) {
      fireEvent.mouseEnter(lightOption);
      fireEvent.mouseLeave(lightOption);
      fireEvent.focus(lightOption);
      fireEvent.blur(lightOption);
    }

    expect(sunStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(sunStopAnimationMock).toHaveBeenCalledTimes(2);
  });

  it("animates the computer-desktop icon when hovering the system theme drawer option", () => {
    useLoaderDataMock.mockReturnValue({ theme: "dark" });
    render(<SettingsDropdown />);

    const systemOption = screen
      .getAllByText("system")
      .map((node) => node.closest("button"))
      .filter((node): node is HTMLButtonElement => node !== null)[0];
    if (systemOption) {
      fireEvent.mouseEnter(systemOption);
      fireEvent.mouseLeave(systemOption);
      fireEvent.focus(systemOption);
      fireEvent.blur(systemOption);
    }

    expect(computerStartAnimationMock).toHaveBeenCalledTimes(2);
    expect(computerStopAnimationMock).toHaveBeenCalledTimes(2);
  });
});
