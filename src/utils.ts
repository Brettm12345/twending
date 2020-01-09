import * as t from 'io-ts'
import fetch from 'unfetch'
import {
  constant as c,
  flow as f,
  identity as id,
  not,
} from 'fp-ts/lib/function'
import { fromFoldableMap, lookup } from 'fp-ts/lib/Record'
import { filter, flatten, array } from 'fp-ts/lib/Array'
import { chain, Task } from 'fp-ts/lib/Task'
import { FC, createElement } from 'react'
import { pipe as p } from 'fp-ts/lib/pipeable'
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import cn from 'ts-classnames'

type Json = (f: Task<Response>) => Task<any>
export const json: Json = chain(r => c(r.json()))

type Get = (...a: Parameters<typeof fetch>) => Task<any>
export const get: Get = f(f(fetch, c), json)

type Tag = keyof import('@emotion/styled').StyledTags<
  unknown
>
type Option<A> = import('fp-ts/lib/Option').Option<A>
type PropsOf<
  T
> = import('@emotion/styled-base/types/helper').PropsOf<T>

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

type Join = <A extends unknown[]>(
  s?: string
) => (a: A) => string
export const join: Join = s => a => a.join(s)

export const empty = (a: any[]) => a.length === 0

export const any = f(filter<boolean>(id), not(empty))

type Has = <A>(x: A) => (xs: A[]) => boolean
export const has: Has = x =>
  f(
    filter(a => a === x),
    not(empty)
  )

type InAny = <A>(xs: A[][]) => (x: A) => boolean
export const inAny: InAny = xs => x =>
  p(flatten(xs), has(x))

type OneOf = (xs: string[]) => t.Mixed
export const oneOf: OneOf = xs =>
  p(
    fromFoldableMap(getLastSemigroup<string>(), array)(
      xs,
      x => [x, x]
    ),
    t.keyof
  )

type Find = <A>(
  r: Record<string, A>
) => (k: string) => Option<A>
export const find: Find = r => k => lookup(k, r)

type Nullable = (
  type: t.Mixed
) => t.UnionC<[t.Mixed, t.NullC]>
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
