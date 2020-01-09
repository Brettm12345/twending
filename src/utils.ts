import * as t from 'io-ts'
import {
  flow as f,
  identity as id,
} from 'fp-ts/lib/function'
import { fromFoldableMap, lookup } from 'fp-ts/lib/Record'
import { filter, flatten, array } from 'fp-ts/lib/Array'
import { FC, createElement } from 'react'
import { pipe as p } from 'fp-ts/lib/pipeable'
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import cn from 'ts-classnames'

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
export const makeOption: MakeOption = <L extends string>(
  label: L
): SelectOption<L> => ({
  label,
  value: label,
})

type Join = <A extends unknown[]>(
  s?: string
) => (a: A) => string
export const join: Join = s => a => a.join(s)

type Any = (a: boolean[]) => boolean
export const any: Any = f(
  filter<boolean>(id),
  a => a.length > 0
)

type Has = <A>(x: A) => (xs: A[]) => boolean
export const has: Has = x => xs =>
  xs.filter(a => a === x).length > 0

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
    className: `${cn(...c)}${className}`,
    ...p,
  })
