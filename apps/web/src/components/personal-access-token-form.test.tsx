import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "jotai";
import type { ComponentProps, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { PersonalAccessTokenForm } from "./personal-access-token-form";

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    disabled,
    onClick,
    type,
    ...props
  }: ComponentProps<"button"> & { children: ReactNode }) => (
    <button disabled={disabled} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/dialog", () => ({
  DialogFooter: ({ children }: { children: ReactNode }) => (
    <div data-testid="dialog-footer">{children}</div>
  ),
}));

vi.mock("@/components/ui/drawer", () => ({
  DrawerFooter: ({ children }: { children: ReactNode }) => (
    <div data-testid="drawer-footer">{children}</div>
  ),
}));

vi.mock("@/components/ui/field", () => ({
  Field: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  FieldError: ({ errors }: { errors: string[] }) => (
    <div data-testid="field-error">{errors.join(", ")}</div>
  ),
  FieldGroup: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  FieldLabel: ({
    children,
    htmlFor,
  }: {
    children: ReactNode;
    htmlFor?: string;
  }) => <label htmlFor={htmlFor}>{children}</label>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: ({
    id,
    name,
    onBlur,
    onChange,
    placeholder,
    value,
    ...props
  }: ComponentProps<"input">) => (
    <input
      data-testid="token-input"
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      {...props}
    />
  ),
}));

vi.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: vi.fn(() => false),
}));

function Wrapper({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

describe("PersonalAccessTokenForm", () => {
  it("renders the form with personal access token field", () => {
    const onClose = vi.fn();

    render(<PersonalAccessTokenForm onClose={onClose} />, { wrapper: Wrapper });

    expect(screen.getByText("Personal Access Token")).toBeInTheDocument();
    expect(screen.getByTestId("token-input")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders DialogFooter on desktop", () => {
    const onClose = vi.fn();

    render(<PersonalAccessTokenForm onClose={onClose} />, { wrapper: Wrapper });

    expect(screen.getByTestId("dialog-footer")).toBeInTheDocument();
  });

  it("calls onClose when Close button is clicked", async () => {
    const onClose = vi.fn();

    render(<PersonalAccessTokenForm onClose={onClose} />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText("Close"));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  it("shows existing token value from storage", () => {
    localStorage.setItem(
      "personalAccessToken",
      JSON.stringify("existing-token"),
    );
    const onClose = vi.fn();

    render(<PersonalAccessTokenForm onClose={onClose} />, { wrapper: Wrapper });

    expect(screen.getByTestId("token-input")).toHaveValue("existing-token");
  });

  it("updates token value when typing", async () => {
    localStorage.setItem("personalAccessToken", JSON.stringify(null));
    const onClose = vi.fn();

    render(<PersonalAccessTokenForm onClose={onClose} />, { wrapper: Wrapper });

    const input = screen.getByTestId("token-input");

    fireEvent.change(input, { target: { value: "new-token-value" } });

    expect(input).toHaveValue("new-token-value");
  });

  it("has correct input attributes for security", () => {
    const onClose = vi.fn();

    render(<PersonalAccessTokenForm onClose={onClose} />, { wrapper: Wrapper });

    const input = screen.getByTestId("token-input");
    expect(input).toHaveAttribute("autocomplete", "off");
    expect(input).toHaveAttribute("spellcheck", "false");
    expect(input).toHaveAttribute("required");
  });

  it("submits form and calls onClose when Save is clicked with valid token", async () => {
    localStorage.setItem("personalAccessToken", JSON.stringify(null));
    const onClose = vi.fn();

    render(<PersonalAccessTokenForm onClose={onClose} />, { wrapper: Wrapper });

    const input = screen.getByTestId("token-input");
    fireEvent.change(input, { target: { value: "valid-token" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
