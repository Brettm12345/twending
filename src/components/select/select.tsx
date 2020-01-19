import React, { ReactElement } from 'react'
import ReactSelect, {
  Props,
  OptionTypeBase,
} from 'react-select'
import defaultProps from './select.props'

const Select = <OptionType extends OptionTypeBase = {}>(
  props: Props<OptionType>
): ReactElement => (
  <ReactSelect {...defaultProps} {...props} />
)

export default Select
