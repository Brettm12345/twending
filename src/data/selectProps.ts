import { Props } from 'react-select'

import theme from './theme'

const {
  colors: { blue },
} = theme

const selectProps: Props<any> = {
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
}

export default selectProps
