import { CSSProperties as CSS } from 'react'
import { FunctionN as FN } from 'fp-ts/lib/function'

import Select from './select'

import {
  options,
  getColor,
  OptionType,
} from 'data/languages'

interface StyleProps {
  data: OptionType
}

const dot: FN<[CSS, StyleProps], CSS> = (
  initial,
  { data: { label } }
) => ({
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
