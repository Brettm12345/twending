import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GithubRepository } from "./github-repository";

const repository = {
  name: "twending",
  description: null,
  html_url: "https://github.com/brettm12345/twending",
  stargazers_count: 12345,
  watchers_count: 678,
  forks: 90,
  language: null,
  owner: {
    login: "brettm12345",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  },
};

describe("GithubRepository", () => {
  it("renders repository metadata with fallbacks", () => {
    render(<GithubRepository repository={repository as never} />);

    expect(screen.getByText("twending")).toBeInTheDocument();
    expect(screen.getByText("No description")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.getByText("12,345")).toBeInTheDocument();
    expect(screen.getByText("678")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /twending/i });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/brettm12345/twending",
    );

    const avatar = screen.getByAltText("brettm12345");
    expect(avatar).toHaveAttribute(
      "srcset",
      expect.stringContaining(
        "https://wsrv.nl/?url=avatars.githubusercontent.com%2Fu%2F1&w=40&h=40&output=webp&maxage=1w",
      ),
    );
  });
});
