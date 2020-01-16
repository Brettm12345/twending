import * as t from 'io-ts'
import * as RD from '@devexperts/remote-data-ts'
import { RemoteData } from '@devexperts/remote-data-ts'
import fetch from 'unfetch'
import {
  constant,
  flow,
  not,
  Endomorphism,
  FunctionN as FN,
} from 'fp-ts/lib/function'
import { fromFoldableMap, lookup } from 'fp-ts/lib/Record'
import {
  filter,
  flatten,
  array,
  isEmpty,
} from 'fp-ts/lib/Array'
import { chain, Task } from 'fp-ts/lib/Task'
import { FC, createElement } from 'react'
import { pipe } from 'fp-ts/lib/pipeable'
import { Option } from 'fp-ts/lib/Option'
import { PropsOf } from '@emotion/styled-base/types/helper'
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import cn from 'ts-classnames'

type Tag = keyof import('@emotion/styled').StyledTags<
  unknown
>

type JoinRD = <E, A>(
  a: RemoteData<E, A[]>
) => Endomorphism<RemoteData<E, A[]>>
export const joinRD: JoinRD = a => b =>
  pipe(RD.combine(a, b), RD.map(flatten))

type Json = FN<[Task<Response>], Task<any>>
export const json: Json = chain(r => () => r.json())

type Get = FN<Parameters<typeof fetch>, Task<any>>
export const get: Get = flow(flow(fetch, constant), json)

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

type OneOf = FN<[Array<string>], t.Mixed>
export const oneOf: OneOf = xs =>
  pipe(
    fromFoldableMap(getLastSemigroup<string>(), array)(
      xs,
      x => [x, x]
    ),
    t.keyof
  )

type Find = <A>(
  r: Record<string, A>
) => FN<[string], Option<A>>
export const find: Find = r => k => lookup(k, r)

type Nullable = FN<[t.Mixed], t.UnionC<[t.Mixed, t.NullC]>>
export const nullable: Nullable = type =>
  t.union([type, t.null])

type TW = <T extends Tag>(
  t: T
) => (...c: ClassNames[]) => FC<PropsOf<T>>
export const tw: TW = t => (...c) => ({
  className = '',
  ...p
}) =>
  createElement(t, {
    className: `${cn(...c)} ${className}`,
    ...p,
  })
