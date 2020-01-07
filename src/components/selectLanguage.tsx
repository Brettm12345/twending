import React, { FC } from 'react'
import Select, { Props } from 'react-select'

import selectProps from 'data/selectProps'
import { options, getColor } from 'data/languages'
import { LanguageOption } from 'types'
import { styleFn } from 'react-select/src/styles'

const dot: styleFn = (initial, { data }) => ({
  ...initial,
  '&::before': {
    backgroundColor: getColor(data.label),
  },
})

const SelectLanguage: FC<Props<LanguageOption>> = props => (
  <Select
    {...selectProps}
    {...props}
    id="language-select"
    options={options}
    styles={{
      option: dot,
      singleValue: dot,
    }}
  />
)

export default SelectLanguage
