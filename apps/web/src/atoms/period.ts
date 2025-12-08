import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const periodAtom = atomWithStorage<
  "daily" | "weekly" | "monthly" | "yearly"
>("period", "daily");

export function usePeriod() {
  return useAtom(periodAtom);
}

export function useSetPeriod() {
  return useSetAtom(periodAtom);
}

export function usePeriodValue() {
  return useAtomValue(periodAtom);
}
