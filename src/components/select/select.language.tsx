import React, { CSSProperties, FC } from 'react'
import Select, { Props } from 'react-select'

import selectProps from './select.props'

import { options, getColor, Option } from 'data/languages'

interface StyleProps {
  data: Option
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

const SelectLanguage: FC<Props<Option>> = props => (
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
