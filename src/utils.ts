import * as RD from '@devexperts/remote-data-ts'
import { RemoteData } from '@devexperts/remote-data-ts'
import { array } from 'fp-ts/lib/Array'
import { flow, not, Endomorphism } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Record'
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import * as T from 'fp-ts/lib/Task'
import { Mixed } from 'io-ts'
import * as t from 'io-ts'
import { List, flatten, reduce, filter } from 'list/curried'
import * as L from 'list/curried'
import { cn } from 'ts-classnames'

export const uniq = (list: List<string>) =>
  pipe(new Set(list), L.from)

const isNonEmpty = (a: string) => a.length > 0

export const append = (str: string) => (xs: string) =>
  isNonEmpty(xs) ? str + xs : xs

export const join = (separator: string) =>
  reduce<string, string>(
    (b, a) =>
      isNonEmpty(a) && isNonEmpty(b)
        ? b + separator + a
        : b + a,
    ''
  )

type RemoteList<E, A> = RemoteData<E, List<A>>
export const joinRD = <E, A>(
  b: RemoteList<E, A>
): Endomorphism<RemoteList<E, A>> =>
  RD.chain(xs => pipe(b, RD.map(L.concat(xs))))

export const joinRDWith = <E, A>(a: RemoteList<E, A>) =>
  T.map(joinRD(a))

export const makeOption = <L extends string>(label: L) => ({
  label,
  value: label,
})

export const has = <A>(x: A) =>
  flow(
    filter<A>(a => a !== x),
    not(L.isEmpty)
  )

export const any: (xs: List<boolean>) => boolean = has(
  true as boolean
)

export const concat = <A>(x: A) => (xs: A[]): A[] => [
  ...xs,
  x,
]

export const inAny = <A>(xs: List<List<A>>) => (
  x: A
): boolean => pipe(flatten(xs), has(x))

export const oneOf = (xs: List<string>): Mixed =>
  pipe(
    R.fromFoldableMap(
      getLastSemigroup<string>(),
      array
    )(L.toArray(xs), x => [x, x]),
    t.keyof
  )

export const lookup = <A>(r: Record<string, A>) => (
  k: string
): Option<A> => R.lookup(k, r)

export const tw = flow(cn, className => ({ className }))
