import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { Logo } from "./logo";

vi.mock("@unpic/react", () => ({
  Image: (props: ComponentProps<"img">) => <img alt="" {...props} />,
}));

describe("Logo", () => {
  it("renders a secure external link with logo image", () => {
    render(<Logo className="custom-logo" />);

    const link = screen.getByRole("link", { name: "Twending" });
    const image = screen.getByAltText("Twending");

    expect(link).toHaveAttribute(
      "href",
      "https://github.com/brettm12345/twending",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("custom-logo");
    expect(image).toHaveAttribute("src", "/logo.png");
    expect(image).toHaveClass("custom-logo");
  });
});
