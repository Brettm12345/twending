import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges conditional classes and resolves conflicting tailwind utilities", () => {
    expect(cn("px-2", false, "px-4", "font-medium")).toBe("px-4 font-medium");
  });
});
