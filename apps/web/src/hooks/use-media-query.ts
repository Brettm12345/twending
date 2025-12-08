import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }
    const media = window.matchMedia(query);
    setMatches(media.matches);
    media.addEventListener("change", handleChange);
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [query]);
  return matches;
}