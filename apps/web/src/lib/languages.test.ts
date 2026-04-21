import { describe, expect, it } from "vitest";
import { languages } from "./languages";

describe("languages", () => {
  it("exports popular languages array", () => {
    expect(Array.isArray(languages.popular)).toBe(true);
    expect(languages.popular.length).toBeGreaterThan(0);
    expect(languages.popular).toContain("TypeScript");
    expect(languages.popular).toContain("JavaScript");
    expect(languages.popular).toContain("Python");
  });

  it("exports everythingElse languages array", () => {
    expect(Array.isArray(languages.everythingElse)).toBe(true);
    expect(languages.everythingElse.length).toBeGreaterThan(0);
    expect(languages.everythingElse).toContain("Java");
    expect(languages.everythingElse).toContain("Kotlin");
  });

  it("exports colors mapping for languages", () => {
    expect(typeof languages.colors).toBe("object");
    expect(languages.colors.TypeScript).toBe("#2b7489");
    expect(languages.colors.JavaScript).toBe("#f1e05a");
    expect(languages.colors.Python).toBe("#3572A5");
  });

  it("has colors for most popular languages", () => {
    const popularLanguagesWithColors = languages.popular.filter(
      (language) =>
        languages.colors[language as keyof typeof languages.colors] !==
        undefined,
    );

    // Most popular languages should have colors
    expect(popularLanguagesWithColors.length).toBeGreaterThan(
      languages.popular.length / 2,
    );
  });
});
