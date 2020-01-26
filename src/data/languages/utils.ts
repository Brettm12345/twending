import { map } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { getOrElse } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { GroupedOptionsType, GroupType } from 'react-select'

import { all } from './constants'
import {
  colors,
  everythingElse,
  popular,
} from './list.json'
import { Language, OptionType } from './types'

import theme from 'src/data/theme'
import { makeOption, lookup } from 'src/utils'

const {
  colors: { gray },
} = theme

type GetColor = (l: Language) => string
export const getColor: GetColor = flow(
  lookup(colors),
  getOrElse(constant(gray[400]))
)

type MakeGroup = (
  a: [string, string[]]
) => GroupType<OptionType>
const makeGroup: MakeGroup = ([label, values]) =>
  pipe(values, map(makeOption), options => ({
    label,
    options,
  }))

export const allLanguages = makeOption(all)

export const options: GroupedOptionsType<OptionType> = pipe(
  [
    [all, [all]],
    ['Popular', popular],
    ['Everything Else', everythingElse],
  ],
  map(makeGroup)
)
