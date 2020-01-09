import { map, flatten } from 'fp-ts/lib/Array'
import { getOrElse as maybe } from 'fp-ts/lib/Option'
import {
  constant as c,
  flow as f,
} from 'fp-ts/lib/function'
import { pipe as p } from 'fp-ts/lib/pipeable'

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
export const getColor: GetColor = f(
  find(colors),
  maybe(c(gray[400]))
)

export const options: Option[] = p(
  [['All Languages'], popular, everythingElse],
  flatten,
  map(l => makeOption<Language>(l))
)
