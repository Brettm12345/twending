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

const SelectLanguage = ([value, onChange]: [
  OptionType,
  (a: OptionType) => void
]) =>
  Select({
    id: 'language-select',
    onChange: onChange as VoidFunction,
    options,
    styles: {
      option: dot,
      singleValue: dot,
    },
    value,
  })

export default SelectLanguage
