import * as t from 'io-ts'

import { everythingElse, popular } from './list.json'
import { oneOf } from 'utils'

export const AllLanguages = t.literal('All Languages')
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

export type Option = Record<'label' | 'value', Language>
