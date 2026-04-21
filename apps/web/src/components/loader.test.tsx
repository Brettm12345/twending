import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Loader from "./loader";

vi.mock("@/components/repository-skeleton", () => ({
  RepositorySkeleton: () => <div data-testid="repository-skeleton" />,
}));

describe("Loader", () => {
  it("renders 20 repository skeleton items", () => {
    const { container, getAllByTestId } = render(<Loader />);

    expect(container.querySelectorAll('[data-slot="item-group"]')).toHaveLength(
      1,
    );
    expect(getAllByTestId("repository-skeleton")).toHaveLength(20);
  });
});
