import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const languageAtom = atomWithStorage<string>(
	"language",
	"All Languages",
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
