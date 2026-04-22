import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// `getOnInit: true` makes the atom read from localStorage during initial value
// computation rather than only after the first render. Without it, components
// would render once with the fallback ("All Languages") before hydration —
// which lets the URL <-> local storage sync effect overwrite the persisted
// value with the fallback on mount.
export const languageAtom = atomWithStorage<string>(
  "language",
  "All Languages",
  undefined,
  { getOnInit: true },
);

export function useSetLanguage() {
  return useSetAtom(languageAtom);
}

export function useLanguageValue() {
  return useAtomValue(languageAtom);
}

export function useLanguage() {
  return useAtom(languageAtom);
}
