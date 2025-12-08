import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    media.addEventListener("change", (event) => setMatches(event.matches));
    return () => {
      media.removeEventListener("change", (event) => setMatches(event.matches));
    };
  }, [query]);
  return matches;
}
