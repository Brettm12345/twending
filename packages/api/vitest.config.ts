import { defineConfig } from "vitest/config";

const excludedFiles = ["coverage/**", "dist/**", "node_modules/**"];
const excludedFromCoverage = [...excludedFiles, "src/**/*.test.ts"];

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    exclude: excludedFiles,
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: excludedFromCoverage,
    },
  },
});
