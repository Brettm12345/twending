import njsx from 'njsx'
import { Select as SelectComponent } from 'react-functional-select'

import { options, OptionType } from 'src/data/period'
import theme from 'src/data/theme'

const Select = njsx(SelectComponent)

const {
  colors: { gray, blue },
} = theme

const SelectLanguage = ([initialValue, onOptionChange]: [
  OptionType,
  (a: OptionType) => void
]) =>
  Select({
    addClassNames: true,
    initialValue,
    isSearchable: false,
    onOptionChange,
    options,
    themeConfig: {
      color: {
        border: gray[700],
        iconSeparator: gray[500],
        primary: blue[500],
      },
      control: {
        boxShadow: 'none',
        focusedBorderColor: blue[500],
      },
      icon: {
        color: gray[400],
        colorHover: gray[300],
      },
      menu: {
        backgroundColor: gray[700],
      },
    },
  })

export default SelectLanguage
