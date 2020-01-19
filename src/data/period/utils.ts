/* eslint-disable sort-keys-fix/sort-keys-fix */
import { collect } from 'fp-ts/lib/Record'
import { pipe } from 'fp-ts/lib/pipeable'

import { Value, Label, OptionType } from './types'

export const options = pipe<
  Record<Value, Label>,
  OptionType[]
>(
  {
    day: 'Daily',
    week: 'Weekly',
    month: 'Monthly',
    year: 'Annually',
  },
  collect((value, label) => ({ label, value }))
)
