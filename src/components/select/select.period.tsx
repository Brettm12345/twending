/* eslint-disable sort-keys-fix/sort-keys-fix */
import { pipe } from 'fp-ts/lib/pipeable'
import React, { FC } from 'react'
import { collect } from 'fp-ts/lib/Record'
import Select, { Props } from 'react-select'

import selectProps from './select.props'

import { Label, Value, Option } from 'data/period'

const SelectPeriod: FC<Props<Option>> = props => (
  <Select
    {...selectProps}
    {...props}
    isSearchable={false}
    options={pipe<Record<Value, Label>, Option[]>(
      {
        day: 'Daily',
        week: 'Weekly',
        month: 'Monthly',
        year: 'Annually',
      },
      collect((value, label) => ({ label, value }))
    )}
  />
)

export default SelectPeriod
