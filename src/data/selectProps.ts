/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Props } from 'react-select'

import theme from './theme'

const {
  colors: { blue, gray, white },
} = theme

const selectProps: Props<any> = {
  className: 'select-container',
  classNamePrefix: 'select',
  theme: initial => ({
    ...initial,
    colors: {
      ...initial.colors,
      neutral0: white,
      neutral10: gray[100],
      neutral20: gray[200],
      primary: blue[500],
      neutral30: gray[300],
      primary50: blue[400],
      neutral40: gray[400],
      primary75: blue[700],
      neutral5: white,
      primary25: blue[300],
      neutral50: gray[500],
      neutral60: gray[600],
      neutral70: gray[700],
      neutral80: gray[800],
      neutral90: gray[900],
    },
  }),
}

export default selectProps
