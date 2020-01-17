import React, { CSSProperties, FC } from 'react'
import Select, { Props } from 'react-select'

import selectProps from './select.props'

import {
  options,
  getColor,
  OptionType,
} from 'data/languages'

interface StyleProps {
  data: OptionType
}

type StyleFn = (
  initial: CSSProperties,
  props: StyleProps
) => CSSProperties
const dot: StyleFn = (initial, { data: { label } }) => ({
  ...initial,
  '&::before': {
    backgroundColor: getColor(label),
  },
})

const SelectLanguage: FC<Props<OptionType>> = props => (
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
