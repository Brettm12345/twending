import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./use-media-query";

function createMediaQueryList(query: string, initialMatch = false) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQueryList = {
    matches: initialMatch,
    media: query,
    onchange: null,
    addEventListener: vi.fn(
      (_event: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener);
      },
    ),
    removeEventListener: vi.fn(
      (_event: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener);
      },
    ),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    dispatch(matches: boolean) {
      mediaQueryList.matches = matches;
      const event = { matches, media: query } as MediaQueryListEvent;
      for (const listener of listeners) {
        listener(event);
      }
    },
  };

  return mediaQueryList;
}

describe("useMediaQuery", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reads the initial browser match value", () => {
    const mediaQueryList = createMediaQueryList("(min-width: 768px)", true);
    window.matchMedia = vi.fn().mockReturnValue(mediaQueryList);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 768px)");
    expect(result.current).toBe(true);
  });

  it("updates when the media query result changes and cleans up listeners", () => {
    const mediaQueryList = createMediaQueryList("(prefers-color-scheme: dark)");
    window.matchMedia = vi.fn().mockReturnValue(mediaQueryList);

    const { result, unmount } = renderHook(() =>
      useMediaQuery("(prefers-color-scheme: dark)"),
    );

    act(() => {
      mediaQueryList.dispatch(true);
    });

    expect(result.current).toBe(true);

    unmount();

    expect(mediaQueryList.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
    expect(mediaQueryList.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});
