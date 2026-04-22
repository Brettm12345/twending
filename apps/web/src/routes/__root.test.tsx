import { render, screen } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const useMediaQueryMock = vi.fn(() => false);
const getThemeServerFnMock = vi.fn(() =>
  Promise.resolve("system" as "light" | "dark" | "system"),
);
const useLoaderDataMock = vi.fn(() => ({
  theme: "system" as "light" | "dark" | "system",
}));
const posthogInitMock = vi.fn();

let capturedRouteConfig:
  | {
      loader: () => Promise<unknown>;
      head: () => unknown;
      component: () => ReactNode;
    }
  | undefined;

const createRootRouteWithContextMock = vi.fn(
  () =>
    (config: {
      loader: () => Promise<unknown>;
      head: () => unknown;
      component: () => ReactNode;
    }) => {
      capturedRouteConfig = config;
      return {
        useLoaderData: () => useLoaderDataMock(),
        config,
      };
    },
);

vi.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: () => <div data-testid="react-query-devtools" />,
}));

vi.mock("@tanstack/react-router", () => ({
  createRootRouteWithContext: createRootRouteWithContextMock,
  HeadContent: () => <div data-testid="head-content" />,
  Outlet: () => <div data-testid="outlet" />,
  Scripts: () => <div data-testid="scripts" />,
}));

vi.mock("@tanstack/react-router-devtools", () => ({
  TanStackRouterDevtools: () => <div data-testid="router-devtools" />,
}));

vi.mock("nuqs/adapters/tanstack-router", () => ({
  NuqsAdapter: ({ children }: { children: ReactNode }) => (
    <div data-testid="nuqs-adapter">{children}</div>
  ),
}));

vi.mock("posthog-js", () => ({
  default: { init: (...args: unknown[]) => posthogInitMock(...args) },
}));

vi.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: () => useMediaQueryMock(),
}));

vi.mock("@/lib/theme", () => ({
  getThemeServerFn: () => getThemeServerFnMock(),
}));

vi.mock("@/styles.css?url", () => ({ default: "/styles.css" }));

vi.mock("@/utils/seo", () => ({
  seo: vi.fn(() => [{ title: "Twending" }]),
}));

beforeEach(() => {
  useMediaQueryMock.mockReset();
  getThemeServerFnMock.mockReset();
  useLoaderDataMock.mockReset();
  posthogInitMock.mockReset();

  useMediaQueryMock.mockReturnValue(false);
  getThemeServerFnMock.mockReturnValue(Promise.resolve("system"));
  useLoaderDataMock.mockReturnValue({ theme: "system" as const });
});

describe("__root route", () => {
  it("registers a root route with a loader, head metadata and a component", async () => {
    await import("./__root");

    expect(capturedRouteConfig?.loader).toBeTypeOf("function");
    expect(capturedRouteConfig?.head).toBeTypeOf("function");
    expect(capturedRouteConfig?.component).toBeTypeOf("function");
  });

  it("loads the persisted theme via getThemeServerFn", async () => {
    await import("./__root");

    getThemeServerFnMock.mockReturnValue(Promise.resolve("dark"));
    const result = await capturedRouteConfig?.loader();

    expect(result).toEqual({ theme: "dark" });
  });

  it("returns head metadata that includes the stylesheet link and favicons", async () => {
    await import("./__root");

    const head = capturedRouteConfig?.head() as {
      meta: Array<Record<string, unknown>>;
      links: Array<Record<string, unknown>>;
    };

    expect(head.meta[0]).toEqual({ charSet: "utf-8" });
    expect(head.links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rel: "stylesheet" }),
        expect.objectContaining({ rel: "manifest" }),
      ]),
    );
  });

  it("renders the document tree with the outlet and devtools", async () => {
    await import("./__root");

    const Component = capturedRouteConfig?.component;
    expect(Component).toBeDefined();

    if (Component) {
      render(createElement(Component));
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
      expect(screen.getByTestId("nuqs-adapter")).toBeInTheDocument();
      expect(screen.getByTestId("router-devtools")).toBeInTheDocument();
      expect(screen.getByTestId("react-query-devtools")).toBeInTheDocument();
      expect(posthogInitMock).toHaveBeenCalledWith(
        "phc_dAam8kgQPVoA93AZYmMNBcknT1PXOmwseN1FA3fjGYG",
        expect.objectContaining({ api_host: "/ph" }),
      );
    }
  });

  it("renders the body content for an explicit dark preference", async () => {
    useLoaderDataMock.mockReturnValue({ theme: "dark" as const });
    await import("./__root");

    const Component = capturedRouteConfig?.component;
    if (Component) {
      const { container } = render(createElement(Component));
      expect(container.querySelector("main")).toHaveClass("dark");
    }
  });

  it("renders the body content for an explicit light preference", async () => {
    useLoaderDataMock.mockReturnValue({ theme: "light" as const });
    await import("./__root");

    const Component = capturedRouteConfig?.component;
    if (Component) {
      const { container } = render(createElement(Component));
      expect(container.querySelector("main")).not.toHaveClass("dark");
    }
  });

  it("renders the body content for the system preference with prefers-dark", async () => {
    useLoaderDataMock.mockReturnValue({ theme: "system" as const });
    useMediaQueryMock.mockReturnValue(true);
    await import("./__root");

    const Component = capturedRouteConfig?.component;
    if (Component) {
      const { container } = render(createElement(Component));
      expect(container.querySelector("main")).toHaveClass("dark");
    }
  });

  it("renders the body content for the system preference with prefers-light", async () => {
    useLoaderDataMock.mockReturnValue({ theme: "system" as const });
    useMediaQueryMock.mockReturnValue(false);
    await import("./__root");

    const Component = capturedRouteConfig?.component;
    if (Component) {
      const { container } = render(createElement(Component));
      expect(container.querySelector("main")).not.toHaveClass("dark");
    }
  });
});
