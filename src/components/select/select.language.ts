import { CSSProperties } from 'react'

import Select from './select'

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

const SelectLanguage = Select({
  id: 'language-select',
  options,
  styles: {
    option: dot,
    singleValue: dot,
  },
})

export default SelectLanguage
