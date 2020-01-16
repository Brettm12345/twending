import { map, flatten } from 'fp-ts/lib/Array'
import { getOrElse } from 'fp-ts/lib/Option'
import { constant, flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

import {
  colors,
  everythingElse,
  popular,
} from './list.json'
import { Language, Option } from './types'

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

export const options: Option[] = pipe(
  [['All Languages'], popular, everythingElse],
  flatten,
  map(makeOption)
)
