import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// `getOnInit: true` makes the atom read from localStorage during initial value
// computation rather than only after the first render. Without it, components
// would render once with the fallback ("daily") before hydration — which lets
// the URL <-> local storage sync effect overwrite the persisted value with the
// fallback on mount.
export const periodAtom = atomWithStorage<
  "daily" | "weekly" | "monthly" | "yearly"
>("period", "daily", undefined, { getOnInit: true });

export function usePeriod() {
  return useAtom(periodAtom);
}

export function useSetPeriod() {
  return useSetAtom(periodAtom);
}

export function usePeriodValue() {
  return useAtomValue(periodAtom);
}
