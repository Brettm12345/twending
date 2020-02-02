import { FunctionN as FN } from 'fp-ts/lib/function'
import { CSSProperties as CSS } from 'react'

import Select from './select'

import {
  options,
  getColor,
  OptionType,
} from 'src/data/languages'

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
  typeof window !== 'undefined' &&
  Select({
    id: 'language-select',
    onChange: onChange as VoidFunction,
    options,
    styles: {
      option: dot,
      singleValue: initial => ({
        ...initial,
        '&::before': {
          backgroundColor: getColor(value.label),
        },
      }),
    },
    value,
  })

export default SelectLanguage
