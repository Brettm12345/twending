import { render, screen } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "./app-shell";

vi.mock("@/components/language-select", () => ({
  LanguageSelect: () => <div>Language Select</div>,
}));

vi.mock("@/components/logo", () => ({
  Logo: () => <div>Logo</div>,
}));

vi.mock("@/components/period-select", () => ({
  PeriodSelect: () => <div>Period Select</div>,
}));

vi.mock("@/components/settings-dropdown", () => ({
  SettingsDropdown: () => <div>Settings Dropdown</div>,
}));

vi.mock("@/components/ui/app-bar", () => ({
  AppBar: ({
    children,
    ...props
  }: ComponentProps<"div"> & { children: ReactNode }) => (
    <div data-testid="app-bar" {...props}>
      {children}
    </div>
  ),
}));

describe("AppShell", () => {
  it("renders shared layout chrome and children content", () => {
    render(
      <AppShell data-testid="app-shell">
        <p>Repository content</p>
      </AppShell>,
    );

    expect(screen.getByTestId("app-shell")).toBeInTheDocument();
    expect(screen.getByTestId("app-bar")).toBeInTheDocument();
    expect(screen.getByText("Trending Repositories")).toBeInTheDocument();
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Language Select")).toBeInTheDocument();
    expect(screen.getByText("Period Select")).toBeInTheDocument();
    expect(screen.getByText("Settings Dropdown")).toBeInTheDocument();
    expect(screen.getByText("Repository content")).toBeInTheDocument();
  });
});
