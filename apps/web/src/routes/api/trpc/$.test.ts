import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchRequestHandlerMock = vi.fn(() => new Response("ok"));
const createFileRouteMock = vi.fn((_path: string) => (config: unknown) => ({
  path: _path,
  config,
}));
const appRouterMock = { router: true };
const createTRPCContextMock = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: (path: string) => createFileRouteMock(path),
}));

vi.mock("@trpc/server/adapters/fetch", () => ({
  fetchRequestHandler: (...args: unknown[]) => fetchRequestHandlerMock(...args),
}));

vi.mock("@trpc/tanstack-react-query", () => ({
  createTRPCContext: createTRPCContextMock,
}));

vi.mock("@twending/api/routers/index", () => ({
  appRouter: appRouterMock,
}));

describe("trpc fetch route", () => {
  beforeEach(() => {
    fetchRequestHandlerMock.mockClear();
    createFileRouteMock.mockClear();
  });

  it("registers the file route with GET and POST handlers", async () => {
    const { Route } = await import("./$");

    expect(createFileRouteMock).toHaveBeenCalledWith("/api/trpc/$");
    const definition = Route as unknown as {
      config: { server: { handlers: Record<string, unknown> } };
    };
    expect(definition.config.server.handlers.GET).toBeTypeOf("function");
    expect(definition.config.server.handlers.POST).toBeTypeOf("function");
  });

  it("delegates each request to fetchRequestHandler with the app router", async () => {
    const { Route } = await import("./$");
    const definition = Route as unknown as {
      config: {
        server: {
          handlers: {
            GET: (input: { request: Request }) => Response;
            POST: (input: { request: Request }) => Response;
          };
        };
      };
    };

    const request = new Request("https://example.test/api/trpc/foo");
    definition.config.server.handlers.GET({ request });

    expect(fetchRequestHandlerMock).toHaveBeenCalledWith({
      req: request,
      router: appRouterMock,
      createContext: createTRPCContextMock,
      endpoint: "/api/trpc",
    });

    fetchRequestHandlerMock.mockClear();
    definition.config.server.handlers.POST({ request });
    expect(fetchRequestHandlerMock).toHaveBeenCalledWith({
      req: request,
      router: appRouterMock,
      createContext: createTRPCContextMock,
      endpoint: "/api/trpc",
    });
  });
});
