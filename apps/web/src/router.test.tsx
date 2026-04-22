import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

interface CapturedRouterConfig {
  routeTree: unknown;
  context: { trpc: unknown; queryClient: unknown };
  defaultPendingComponent?: () => ReactNode;
  defaultNotFoundComponent?: () => ReactNode;
  Wrap?: ({ children }: { children: ReactNode }) => ReactNode;
  scrollRestoration?: boolean;
  defaultPreloadStaleTime?: number;
}

let capturedRouterConfig: CapturedRouterConfig | undefined;
let capturedQueryCacheConfig:
  | { onError?: (error: unknown) => void }
  | undefined;

const createTanStackRouterMock = vi.fn((config: unknown) => {
  capturedRouterConfig = config as CapturedRouterConfig;
  return { __router: true } as unknown;
});

const queryClientMock = { __queryClient: true };
const queryCacheMock = { __queryCache: true };
const trpcClientMock = { __trpcClient: true };
const trpcOptionsProxyMock = { __trpcOptions: true };

vi.mock("@tanstack/react-query", () => {
  class QueryClient {
    constructor(_config: unknown) {
      Object.assign(this, queryClientMock);
    }
  }
  class QueryCache {
    constructor(config: { onError?: (error: unknown) => void }) {
      capturedQueryCacheConfig = config;
      Object.assign(this, queryCacheMock);
    }
  }
  return {
    QueryClient,
    QueryCache,
    QueryClientProvider: ({ children }: { children: ReactNode }) => (
      <div data-testid="query-client-provider">{children}</div>
    ),
  };
});

vi.mock("@tanstack/react-router", () => ({
  createRouter: (config: unknown) => createTanStackRouterMock(config),
}));

vi.mock("@trpc/client", () => ({
  createTRPCClient: vi.fn(() => trpcClientMock),
  httpBatchLink: vi.fn((options: unknown) => ({ link: "httpBatch", options })),
}));

vi.mock("@trpc/tanstack-react-query", () => ({
  createTRPCOptionsProxy: vi.fn(() => trpcOptionsProxyMock),
}));

vi.mock("@/components/loader", () => ({
  default: () => <div data-testid="loader" />,
}));

vi.mock("@/components/not-found", () => ({
  NotFound: () => <div data-testid="not-found" />,
}));

vi.mock("@/utils/trpc", () => ({
  TRPCProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="trpc-provider">{children}</div>
  ),
}));

vi.mock("@/routeTree.gen", () => ({
  routeTree: { __routeTree: true },
}));

vi.mock("@/styles.css", () => ({}));

beforeEach(() => {
  capturedRouterConfig = undefined;
  createTanStackRouterMock.mockClear();
});

describe("getRouter", () => {
  it("creates a router with scroll restoration and a context that includes trpc + queryClient", async () => {
    const { getRouter } = await import("./router");

    getRouter();

    expect(createTanStackRouterMock).toHaveBeenCalledOnce();
    expect(capturedRouterConfig?.scrollRestoration).toBe(true);
    expect(capturedRouterConfig?.defaultPreloadStaleTime).toBe(0);
    expect(capturedRouterConfig?.context.queryClient).toMatchObject(
      queryClientMock,
    );
    expect(capturedRouterConfig?.context.trpc).toBe(trpcOptionsProxyMock);
  });

  it("renders the loader as the default pending component", async () => {
    const { getRouter } = await import("./router");

    getRouter();

    const PendingComponent = capturedRouterConfig?.defaultPendingComponent;
    expect(PendingComponent).toBeDefined();
    if (PendingComponent) {
      const { getByTestId } = render(<>{PendingComponent()}</>);
      expect(getByTestId("loader")).toBeInTheDocument();
    }
  });

  it("renders NotFound as the default not-found component", async () => {
    const { getRouter } = await import("./router");

    getRouter();

    const NotFoundComponent = capturedRouterConfig?.defaultNotFoundComponent;
    expect(NotFoundComponent).toBeDefined();
    if (NotFoundComponent) {
      const { getByTestId } = render(<>{NotFoundComponent()}</>);
      expect(getByTestId("not-found")).toBeInTheDocument();
    }
  });

  it("wraps children with the QueryClient and tRPC providers", async () => {
    const { getRouter } = await import("./router");

    getRouter();

    const Wrap = capturedRouterConfig?.Wrap;
    expect(Wrap).toBeDefined();
    if (Wrap) {
      const { getByTestId } = render(
        <>{Wrap({ children: <span data-testid="child" /> })}</>,
      );
      expect(getByTestId("query-client-provider")).toBeInTheDocument();
      expect(getByTestId("trpc-provider")).toBeInTheDocument();
      expect(getByTestId("child")).toBeInTheDocument();
    }
  });

  it("clears local storage and logs the error when a query fails", async () => {
    await import("./router");

    expect(capturedQueryCacheConfig?.onError).toBeTypeOf("function");

    localStorage.setItem("foo", "bar");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {
      // suppress noise
    });
    capturedQueryCacheConfig?.onError?.(new Error("boom"));

    expect(localStorage.getItem("foo")).toBeNull();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
