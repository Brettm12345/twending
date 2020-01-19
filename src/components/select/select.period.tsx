import React, { FC } from 'react'
import type { Props } from 'react-select'
import { pipe } from 'fp-ts/lib/pipeable'

import Select from './select'

import { options, OptionType } from 'data/period'

const SelectPeriod: FC<Props<OptionType>> = extra =>
  pipe(
    {
      ...extra,
      isSearchable: false,
      options,
    },
    props => <Select {...props} />
  )

export default SelectPeriod
