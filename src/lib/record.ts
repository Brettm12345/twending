import * as R from 'fp-ts/lib/Record'

export const lookup = <A>(r: Record<string, A>) => (
  k: string
): Option<A> => R.lookup(k, r)
