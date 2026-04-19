import viteReact from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

const excludedFiles = [
  "coverage/**",
  "dist/**",
  "node_modules/**",
  "src/components/ui/**",
  "src/routeTree.gen.ts",
]
const excludedFromCoverage = [
  ...excludedFiles,
  "src/**/*.test.{ts,tsx}",
  "src/test/**",
]

export default defineConfig({
  plugins: [tsconfigPaths(), viteReact()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: excludedFiles,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: excludedFromCoverage,
    },
  },
})
