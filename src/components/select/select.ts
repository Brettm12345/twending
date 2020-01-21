import ReactSelect from 'react-select'
import njsx from 'njsx'

import theme from 'data/theme'

const {
  colors: { blue },
} = theme

const Select = njsx(ReactSelect)({
  className: 'select-container',
  classNamePrefix: 'select',
  theme: initial => ({
    ...initial,
    colors: {
      ...initial.colors,
      primary: blue[500],
      primary25: blue[400],
      primary50: blue[600],
      primary75: blue[700],
    },
  }),
})

export default Select
