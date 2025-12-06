import * as React from "react";

export function useIntersectionObserver<T extends HTMLElement>(
	ref: React.RefObject<T>,
	options: IntersectionObserverInit = {},
	onIntersection: (entry: IntersectionObserverEntry) => void,
) {
	React.useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			onIntersection(entry);
		}, options);

		observer.observe(ref.current);

		return () => {
			observer.unobserve(ref.current);
		};
	}, [ref, options, onIntersection]);

	return ref;
}
