import njsx from 'njsx'
import { FC, useState } from 'react'
import { Select as FunctionalSelect } from 'react-functional-select'

import { SelectProps } from 'react-functional-select/dist/Select'
import caret from './select.caret'
import theme from 'src/data/theme'

const {
  colors: { gray, blue },
} = theme

const Select: FC<SelectProps> = props => {
  const [isOpen, setOpen] = useState(false)
  return njsx(FunctionalSelect)({
    ...props,
    addClassNames: true,
    caretIcon: caret(isOpen)(),
    onMenuClose: () => setOpen(false),
    onMenuOpen: () => setOpen(true),
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
        option: {
          focusedBgColor: gray[600],
          selectedBgColor: gray[500],
        },
      },
    },
  })()
}

export default njsx(Select)
