/* eslint-disable sort-keys-fix/sort-keys-fix */
import { pipe } from 'fp-ts/lib/pipeable'
import React, { FC } from 'react'
import { collect } from 'fp-ts/lib/Record'
import Select, { Props } from 'react-select'

import { Period, PeriodLabel, PeriodOption } from 'types'
import selectProps from 'data/selectProps'

const SelectPeriod: FC<Props<PeriodOption>> = props => (
  <Select
    {...selectProps}
    {...props}
    isSearchable={false}
    options={pipe<
      Record<Period, PeriodLabel>,
      PeriodOption[]
    >(
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
