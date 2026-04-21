import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { languages } from "@/lib/languages";
import { LanguageIndicator } from "./language-indicator";

describe("LanguageIndicator", () => {
  it("uses the configured language color", () => {
    render(<LanguageIndicator data-testid="indicator" language="TypeScript" />);

    expect(screen.getByTestId("indicator")).toHaveStyle({
      backgroundColor: languages.colors.TypeScript,
    });
  });

  it("uses the special all languages color", () => {
    render(
      <LanguageIndicator data-testid="indicator" language="All Languages" />,
    );

    expect(screen.getByTestId("indicator")).toHaveStyle({
      backgroundColor: "#ef4444",
    });
  });
});
