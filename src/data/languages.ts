import { flatten, map } from 'fp-ts/lib/Array'
import { getOrElse } from 'fp-ts/lib/Option'
import { lookup } from 'fp-ts/lib/Record'
import { constant } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

import theme from 'data/theme'
import { makeOption } from '../util'

import {
  colors,
  everythingElse,
  popular,
} from './languages.json'

export const getColor = (language: string) =>
  pipe(
    lookup(language, colors),
    getOrElse(constant(theme.colors.primary))
  )

export const options = pipe(
  [['All Languages'], popular, everythingElse],
  flatten,
  map(makeOption)
)
