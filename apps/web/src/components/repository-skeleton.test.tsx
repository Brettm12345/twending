import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RepositorySkeleton } from "./repository-skeleton";

vi.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <span className={className} data-slot="skeleton" />
  ),
}));

describe("RepositorySkeleton", () => {
  it("renders expected skeleton placeholders", () => {
    const { container, getByTestId } = render(
      <RepositorySkeleton data-testid="repository-skeleton-item" />,
    );

    expect(getByTestId("repository-skeleton-item")).toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(
      8,
    );
  });
});
