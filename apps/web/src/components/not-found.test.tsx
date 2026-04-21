import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NotFound } from "./not-found";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("NotFound", () => {
  it("renders with default props", () => {
    render(<NotFound data-testid="not-found" />);

    expect(screen.getByTestId("not-found")).toBeInTheDocument();
    expect(screen.getByText("404 - Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you're looking for doesn't exist. Click the button below to return to the home page.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Return Home" }),
    ).toBeInTheDocument();
  });

  it("renders with custom title, message, and button text", () => {
    render(
      <NotFound
        buttonText="Go Back"
        data-testid="not-found"
        message="Custom message"
        title="Custom Title"
      />,
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom message")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go Back" })).toBeInTheDocument();
  });

  it("renders a link to the home page", () => {
    render(<NotFound />);

    const link = screen.getByRole("link", { name: "Return Home" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies custom className", () => {
    render(<NotFound className="custom-class" data-testid="not-found" />);

    expect(screen.getByTestId("not-found")).toHaveClass("custom-class");
  });
});
