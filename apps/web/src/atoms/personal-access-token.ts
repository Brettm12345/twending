import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const personalAccessTokenAtom = atomWithStorage<string | null>(
  'personalAccessToken',
  null
)

export function usePersonalAccessToken() {
  return useAtom(personalAccessTokenAtom)
}

export function useSetPersonalAccessToken() {
  return useSetAtom(personalAccessTokenAtom)
}

export function usePersonalAccessTokenValue() {
  return useAtomValue(personalAccessTokenAtom)
}
