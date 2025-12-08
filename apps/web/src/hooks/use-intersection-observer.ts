import * as React from "react";

export function useIntersectionObserver<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: IntersectionObserverInit = {},
  onIntersection: (entry: IntersectionObserverEntry) => void,
) {
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      onIntersection(entry);
    }, options);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options, onIntersection]);

  return ref;
}
