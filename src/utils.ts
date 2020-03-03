import * as RD from '@devexperts/remote-data-ts'
import {
  filter,
  flatten,
  array,
  isEmpty,
} from 'fp-ts/lib/Array'
import { flow, not } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Record'
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import * as T from 'fp-ts/lib/Task'
import * as t from 'io-ts'
import { cn } from 'ts-classnames'

export const joinRD = <E, A>(a: RemoteData<E, A[]>) => (
  b: RemoteData<E, A[]>
): RemoteData<E, A[]> =>
  pipe(RD.combine(a, b), RD.map(flatten))

export const joinRDWith = <E, A>(a: RemoteData<E, A[]>) =>
  T.map(joinRD(a))

export const makeOption = <L extends string>(label: L) => ({
  label,
  value: label,
})

export const join = (x = '') => (a: unknown[]) => a.join(x)

type Has = <A>(x: A) => (xs: A[]) => boolean
export const has: Has = x =>
  flow(
    filter(a => a !== x),
    not(isEmpty)
  )

type Any = (xs: boolean[]) => boolean
export const any: Any = has(true as boolean)

export const concat = <A>(x: A) => (xs: A[]): A[] => [
  ...xs,
  x,
]

export const inAny = <A>(xs: A[][]) => (x: A): boolean =>
  pipe(flatten(xs), has(x))

export const oneOf = (xs: string[]): Mixed =>
  pipe(
    R.fromFoldableMap(getLastSemigroup<string>(), array)(
      xs,
      x => [x, x]
    ),
    t.keyof
  )

export const lookup = <A>(r: Record<string, A>) => (
  k: string
): Option<A> => R.lookup(k, r)

export const tw = flow(cn, className => ({ className }))
