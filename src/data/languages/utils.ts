import memoize from 'fast-memoize'
import { map } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { getOrElse } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import { all } from './constants'
import {
  colors,
  everythingElse,
  popular,
} from './list.json'
import { Language, OptionType } from './types'
import * as theme from 'src/data/theme'
import { makeOption, lookup } from 'src/utils'

const {
  colors: { gray },
} = theme

export const replace = (
  pattern: string | RegExp,
  replacement: string
) => (str: string) => str.replace(pattern, replacement)

type GetColor = (l: Language) => string
export const getColor: GetColor = memoize(
  flow(lookup(colors), getOrElse(constant(gray[400])))
)

export const allLanguages = makeOption(all)

export const options: OptionType[] = pipe(
  [all, ...popular, ...everythingElse],
  map(makeOption)
)
