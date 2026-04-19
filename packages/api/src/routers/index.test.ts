import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./index";

const repository = {
  id: 1,
  name: "twending",
  description: "Trending repositories",
  html_url: "https://github.com/brettm12345/twending",
  stargazers_count: 1200,
  watchers_count: 450,
  forks: 75,
  language: "TypeScript",
  owner: {
    login: "brettm12345",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  },
};

describe("appRouter", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("returns a health check response", async () => {
    const caller = appRouter.createCaller({});

    await expect(caller.healthCheck()).resolves.toBe("OK");
  });

  it("queries GitHub repositories with the selected period and cursor", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-18T12:00:00.000Z"));

    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        total_count: 1,
        incomplete_results: false,
        items: [repository],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const caller = appRouter.createCaller({});
    const result = await caller.listRepositories({
      language: "TypeScript",
      period: "weekly",
      cursor: 2,
      publicAccessToken: "secret-token",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/search/repositories?q=language:TypeScript+created:2026-03-28T12:00:00.000Z..2026-04-04T12:00:00.000Z&sort=stars&order=desc&per_page=30",
      {
        headers: {
          Authorization: "Bearer secret-token",
        },
      },
    );
    expect(result).toEqual({
      repositories: [repository],
      nextCursor: 3,
    });
  });

  it("rejects invalid period input before calling GitHub", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const caller = appRouter.createCaller({});

    await expect(
      caller.listRepositories({
        language: "TypeScript",
        period: "hourly",
      } as never),
    ).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
