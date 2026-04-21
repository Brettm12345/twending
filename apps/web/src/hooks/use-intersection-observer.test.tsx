import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useIntersectionObserver } from "./use-intersection-observer";

const createEntry = (
  target: Element,
  overrides: Partial<IntersectionObserverEntry> = {},
): IntersectionObserverEntry =>
  ({
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRatio: 0,
    intersectionRect: {} as DOMRectReadOnly,
    isIntersecting: false,
    rootBounds: null,
    target,
    time: Date.now(),
    ...overrides,
  }) as IntersectionObserverEntry;

describe("useIntersectionObserver", () => {
  it("observes the current element, forwards entries, and cleans up on unmount", () => {
    const observe = vi.fn();
    const unobserve = vi.fn();
    let callback: IntersectionObserverCallback | undefined;

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds = [];

      constructor(observerCallback: IntersectionObserverCallback) {
        callback = observerCallback;
      }

      disconnect = vi.fn();
      observe = observe;
      takeRecords = vi.fn(() => []);
      unobserve = unobserve;
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    const element = document.createElement("div");
    const ref = { current: element };
    const onIntersection = vi.fn();

    const { result, unmount } = renderHook(() =>
      useIntersectionObserver(ref, { threshold: 0.5 }, onIntersection),
    );

    expect(result.current).toBe(ref);
    expect(observe).toHaveBeenCalledWith(element);

    act(() => {
      callback?.(
        [createEntry(element, { isIntersecting: true, intersectionRatio: 1 })],
        {} as IntersectionObserver,
      );
    });

    expect(onIntersection).toHaveBeenCalledWith(
      expect.objectContaining({
        target: element,
        isIntersecting: true,
        intersectionRatio: 1,
      }),
    );

    unmount();

    expect(unobserve).toHaveBeenCalledWith(element);
  });

  it("skips observation when the ref has no current element", () => {
    const observe = vi.fn();
    const unobserve = vi.fn();

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds = [];

      disconnect = vi.fn();
      observe = observe;
      takeRecords = vi.fn(() => []);
      unobserve = unobserve;
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    const ref = { current: null as HTMLDivElement | null };
    const onIntersection = vi.fn();

    const { unmount } = renderHook(() =>
      useIntersectionObserver(ref, {}, onIntersection),
    );

    expect(observe).not.toHaveBeenCalled();

    unmount();

    expect(unobserve).not.toHaveBeenCalled();
  });
});
