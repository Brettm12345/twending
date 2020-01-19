import React, { CSSProperties, FC } from 'react'
import { pipe } from 'fp-ts/lib/pipeable'
import { Props } from 'react-select'

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

const SelectLanguage: FC<Props<OptionType>> = extra =>
  pipe(
    {
      ...extra,
      id: 'language-select',
      options,
      styles: {
        option: dot,
        singleValue: dot,
      },
    },
    props => <Select {...props} />
  )

export default SelectLanguage
