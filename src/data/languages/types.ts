import * as t from 'io-ts'

import { everythingElse, popular } from './list.json'
import { oneOf } from 'utils'

export const all = 'All Languages'
export const AllLanguages = t.literal(all)
export type AllLanguages = t.TypeOf<typeof AllLanguages>

export const SpecificLanguage = oneOf(
  popular.concat(everythingElse)
)

export type SpecificLanguage = t.TypeOf<
  typeof SpecificLanguage
>

export const Language = t.union([
  AllLanguages,
  SpecificLanguage,
])
export type Language = t.TypeOf<typeof Language>

export type OptionType = Record<'label' | 'value', Language>
