import * as t from 'io-ts'
import * as RD from '@devexperts/remote-data-ts'
import * as R from 'fp-ts/lib/Record'
import {
  flow,
  not,
  Endomorphism,
  FunctionN as FN,
} from 'fp-ts/lib/function'
import { lookup } from 'fp-ts/lib/Record'
import {
  filter,
  flatten,
  array,
  isEmpty,
} from 'fp-ts/lib/Array'
import { cn } from 'ts-classnames'
import { pipe } from 'fp-ts/lib/pipeable'
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import { Mixed } from 'io-ts'
import { RemoteData } from '@devexperts/remote-data-ts'
import { Option } from 'fp-ts/lib/Option'

type JoinRD = <E, A>(
  a: RemoteData<E, A[]>
) => Endomorphism<RemoteData<E, A[]>>
export const joinRD: JoinRD = a => b =>
  pipe(RD.combine(a, b), RD.map(flatten))

interface SelectOption<L extends string> {
  label: L
  value: string
}

type MakeOption = <L extends string>(
  label: L
) => SelectOption<L>
export const makeOption: MakeOption = label => ({
  label,
  value: label,
})

type Join = <A>(s?: string) => FN<[Array<A>], string>
export const join: Join = s => a => a.join(s)

type Has = <A>(x: A) => FN<[Array<A>], boolean>
export const has: Has = x =>
  flow(
    filter(a => a !== x),
    not(isEmpty)
  )

type Any = FN<[Array<boolean>], boolean>
export const any: Any = has(true as boolean)

type InAny = <A>(xs: A[][]) => FN<[A], boolean>
export const inAny: InAny = xs => x =>
  pipe(flatten(xs), has(x))

type OneOf = FN<[Array<string>], Mixed>
export const oneOf: OneOf = xs =>
  pipe(
    R.fromFoldableMap(getLastSemigroup<string>(), array)(
      xs,
      x => [x, x]
    ),
    t.keyof
  )

type Find = <A>(
  r: Record<string, A>
) => FN<[string], Option<A>>
export const find: Find = r => k => lookup(k, r)

export const tw = (...c: ClassNames[]) => ({
  className: cn(...c),
})
