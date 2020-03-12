import { filter, flatten, isEmpty } from 'fp-ts/lib/Array'
import { flow, not } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

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
