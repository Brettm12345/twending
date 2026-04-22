import { beforeEach, describe, expect, it, vi } from "vitest";

const getCookieMock = vi.fn();
const setCookieMock = vi.fn();

vi.mock("@tanstack/react-start", () => {
  type Handler<T> = (args: T) => unknown;
  const builder = (config?: { method?: string }) => ({
    handler: <T>(handler: Handler<T>) => Object.assign(handler, { config }),
    inputValidator: <V>(validator: V) => ({
      handler: <T>(handler: Handler<T>) =>
        Object.assign(handler, { config, validator }),
    }),
  });

  return {
    createServerFn: (config?: { method?: string }) => builder(config),
  };
});

vi.mock("@tanstack/react-start/server", () => ({
  getCookie: (...args: unknown[]) => getCookieMock(...args),
  setCookie: (...args: unknown[]) => setCookieMock(...args),
}));

const STORAGE_KEY = "_preferred-theme";

describe("getThemeServerFn", () => {
  beforeEach(() => {
    getCookieMock.mockReset();
    setCookieMock.mockReset();
  });

  it("returns the persisted theme when the cookie is set", async () => {
    const { getThemeServerFn } = await import("./theme");
    getCookieMock.mockReturnValue("dark");

    const result = await (getThemeServerFn as () => Promise<string>)();

    expect(getCookieMock).toHaveBeenCalledWith(STORAGE_KEY);
    expect(result).toBe("dark");
  });

  it("falls back to the system theme when the cookie is missing", async () => {
    const { getThemeServerFn } = await import("./theme");
    getCookieMock.mockReturnValue(undefined);

    const result = await (getThemeServerFn as () => Promise<string>)();

    expect(result).toBe("system");
  });
});

describe("setThemeServerFn", () => {
  beforeEach(() => {
    getCookieMock.mockReset();
    setCookieMock.mockReset();
  });

  it("persists the chosen theme into a cookie", async () => {
    const { setThemeServerFn } = await import("./theme");

    await (setThemeServerFn as (args: { data: string }) => Promise<unknown>)({
      data: "light",
    });

    expect(setCookieMock).toHaveBeenCalledWith(STORAGE_KEY, "light");
  });

  it("supports the dark theme value", async () => {
    const { setThemeServerFn } = await import("./theme");

    await (setThemeServerFn as (args: { data: string }) => Promise<unknown>)({
      data: "dark",
    });

    expect(setCookieMock).toHaveBeenLastCalledWith(STORAGE_KEY, "dark");
  });
});
