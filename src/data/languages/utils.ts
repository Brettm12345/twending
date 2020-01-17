import { GroupedOptionsType, GroupType } from 'react-select'
import { getOrElse } from 'fp-ts/lib/Option'
import { constant, flow } from 'fp-ts/lib/function'
import { map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'

import {
  colors,
  everythingElse,
  popular,
} from './list.json'
import { Language, OptionType, all } from './types'

import { makeOption, find } from 'utils'
import theme from 'data/theme'

const {
  colors: { gray },
} = theme

type GetColor = (l: Language) => string
export const getColor: GetColor = flow(
  find(colors),
  getOrElse(constant(gray[400]))
)

type MakeGroup = (
  a: [string, string[]]
) => GroupType<OptionType>
const makeGroup: MakeGroup = ([label, values]) => ({
  label,
  options: values.map(makeOption),
})

export const options: GroupedOptionsType<OptionType> = pipe(
  [
    [all, [all]],
    ['Popular', popular],
    ['Everything Else', everythingElse],
  ],
  map(makeGroup)
)
