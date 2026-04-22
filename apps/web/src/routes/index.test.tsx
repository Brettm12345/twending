import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchNextPageMock = vi.fn();
const useInfiniteQueryMock = vi.fn();
const useLanguageValueMock = vi.fn();
const usePeriodValueMock = vi.fn();
const usePersonalAccessTokenValueMock = vi.fn();
const useTRPCMock = vi.fn();
const intersectionObserverMock = vi.fn();
const createFileRouteMock = vi.fn((_path: string) => (config: unknown) => ({
  path: _path,
  config,
}));

vi.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: (...args: unknown[]) => useInfiniteQueryMock(...args),
}));

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: (path: string) => createFileRouteMock(path),
}));

vi.mock("@/atoms/language", () => ({
  useLanguageValue: () => useLanguageValueMock(),
}));

vi.mock("@/atoms/period", () => ({
  usePeriodValue: () => usePeriodValueMock(),
}));

vi.mock("@/atoms/personal-access-token", () => ({
  usePersonalAccessTokenValue: () => usePersonalAccessTokenValueMock(),
}));

vi.mock("@/components/app-shell", () => ({
  AppShell: ({ children }: { children: ReactNode }) => (
    <div data-testid="app-shell">{children}</div>
  ),
}));

vi.mock("@/components/github-repository", () => ({
  GithubRepository: ({
    repository,
  }: {
    repository: { id: number; name: string };
  }) => (
    <div data-testid={`github-repository-${repository.id}`}>
      {repository.name}
    </div>
  ),
}));

vi.mock("@/components/loader", () => ({
  default: () => <div data-testid="loader" />,
}));

vi.mock("@/components/ui/item", () => ({
  ItemGroup: ({ children }: { children: ReactNode }) => (
    <div data-testid="item-group">{children}</div>
  ),
}));

vi.mock("@/hooks/use-intersection-observer", () => ({
  useIntersectionObserver: (...args: unknown[]) =>
    intersectionObserverMock(...args),
}));

vi.mock("@/utils/trpc", () => ({
  useTRPC: () => useTRPCMock(),
}));

beforeEach(() => {
  fetchNextPageMock.mockClear();
  useInfiniteQueryMock.mockReset();
  useLanguageValueMock.mockReset();
  usePeriodValueMock.mockReset();
  usePersonalAccessTokenValueMock.mockReset();
  useTRPCMock.mockReset();
  intersectionObserverMock.mockClear();

  useLanguageValueMock.mockReturnValue("TypeScript");
  usePeriodValueMock.mockReturnValue("daily");
  usePersonalAccessTokenValueMock.mockReturnValue(null);
  useTRPCMock.mockReturnValue({
    listRepositories: {
      infiniteQueryOptions: vi.fn((input: unknown, config: unknown) => ({
        input,
        config,
      })),
    },
  });
  useInfiniteQueryMock.mockReturnValue({
    data: {
      pages: [
        {
          repositories: [
            { id: 1, name: "repo-one" },
            { id: 2, name: "repo-two" },
          ],
          nextCursor: 2,
        },
      ],
    },
    fetchNextPage: fetchNextPageMock,
    hasNextPage: true,
    isFetching: false,
  });
});

describe("home route", () => {
  it("registers a file route at the root path", async () => {
    await import("./index");
    expect(createFileRouteMock).toHaveBeenCalledWith("/");
  });

  it("renders the list of repositories from the infinite query", async () => {
    const mod = await import("./index");
    const HomeComponent = (
      mod.Route as unknown as {
        config: { component: () => ReactNode };
      }
    ).config.component;

    render((<HomeComponent />) as React.ReactElement);

    expect(screen.getByTestId("app-shell")).toBeInTheDocument();
    expect(screen.getByTestId("item-group")).toBeInTheDocument();
    expect(screen.getByTestId("github-repository-1")).toHaveTextContent(
      "repo-one",
    );
    expect(screen.getByTestId("github-repository-2")).toHaveTextContent(
      "repo-two",
    );
  });

  it("renders the loader while the query is fetching", async () => {
    useInfiniteQueryMock.mockReturnValue({
      data: { pages: [] },
      fetchNextPage: fetchNextPageMock,
      hasNextPage: false,
      isFetching: true,
    });

    const mod = await import("./index");
    const HomeComponent = (
      mod.Route as unknown as {
        config: { component: () => ReactNode };
      }
    ).config.component;

    render((<HomeComponent />) as React.ReactElement);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("forwards the personal access token, language and period to the query", async () => {
    useLanguageValueMock.mockReturnValue("Python");
    usePeriodValueMock.mockReturnValue("weekly");
    usePersonalAccessTokenValueMock.mockReturnValue("ghp_xxx");

    const infiniteQueryOptions = vi.fn((input: unknown, config: unknown) => ({
      input,
      config,
    }));
    useTRPCMock.mockReturnValue({
      listRepositories: { infiniteQueryOptions },
    });

    const mod = await import("./index");
    const HomeComponent = (
      mod.Route as unknown as {
        config: { component: () => ReactNode };
      }
    ).config.component;

    render((<HomeComponent />) as React.ReactElement);

    expect(infiniteQueryOptions).toHaveBeenCalledWith(
      {
        language: "Python",
        period: "weekly",
        publicAccessToken: "ghp_xxx",
      },
      expect.objectContaining({ initialCursor: 1 }),
    );
  });

  it("fetches the next page when the intersection observer fires", async () => {
    let capturedHandler:
      | ((entry: IntersectionObserverEntry) => void)
      | undefined;
    intersectionObserverMock.mockImplementation(
      (_ref, _options, handler: (entry: IntersectionObserverEntry) => void) => {
        capturedHandler = handler;
      },
    );

    const mod = await import("./index");
    const HomeComponent = (
      mod.Route as unknown as {
        config: { component: () => ReactNode };
      }
    ).config.component;

    render((<HomeComponent />) as React.ReactElement);

    capturedHandler?.({ isIntersecting: true } as IntersectionObserverEntry);
    expect(fetchNextPageMock).toHaveBeenCalledOnce();

    fetchNextPageMock.mockClear();
    capturedHandler?.({ isIntersecting: false } as IntersectionObserverEntry);
    expect(fetchNextPageMock).not.toHaveBeenCalled();
  });

  it("does not fetch the next page when there is no next page", async () => {
    useInfiniteQueryMock.mockReturnValue({
      data: {
        pages: [
          {
            repositories: [{ id: 1, name: "repo-one" }],
            nextCursor: null,
          },
        ],
      },
      fetchNextPage: fetchNextPageMock,
      hasNextPage: false,
      isFetching: false,
    });

    let capturedHandler:
      | ((entry: IntersectionObserverEntry) => void)
      | undefined;
    intersectionObserverMock.mockImplementation(
      (_ref, _options, handler: (entry: IntersectionObserverEntry) => void) => {
        capturedHandler = handler;
      },
    );

    const mod = await import("./index");
    const HomeComponent = (
      mod.Route as unknown as {
        config: { component: () => ReactNode };
      }
    ).config.component;

    render((<HomeComponent />) as React.ReactElement);

    capturedHandler?.({ isIntersecting: true } as IntersectionObserverEntry);
    expect(fetchNextPageMock).not.toHaveBeenCalled();
  });
});
