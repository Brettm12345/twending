import ReactSelect, { Props } from 'react-select'
import { defaultProps } from 'recompose'

import theme from 'data/theme'

const {
  colors: { blue },
} = theme

const Select = <OptionType>(props: Props<OptionType>) =>
  defaultProps<Props<OptionType>>({
    ...props,
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
  })(ReactSelect)

export default Select
