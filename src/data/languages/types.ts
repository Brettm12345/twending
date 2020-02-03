import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'
import { TypeOf } from 'io-ts'

import * as L from 'list/curried'
import { all } from './constants'

import { everythingElse, popular } from './list.json'
import { oneOf } from 'src/utils'

export const AllLanguages = t.literal(all)
export type AllLanguages = typeof all

export const SpecificLanguage = oneOf(
  pipe(L.from(popular), L.concat(L.from(everythingElse)))
)

export type SpecificLanguage = TypeOf<
  typeof SpecificLanguage
>

export const Language = t.union([
  AllLanguages,
  SpecificLanguage,
])
export type Language = TypeOf<typeof Language>

export type OptionType = Record<'label' | 'value', Language>
