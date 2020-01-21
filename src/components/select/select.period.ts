import Select from './select'

import { options, OptionType } from 'data/period'

const SelectPeriod = ([value, onChange]: [
  OptionType,
  (a: OptionType) => void
]) =>
  Select({
    id: 'select-period',
    isSearchable: false,
    onChange: onChange as VoidFunction,
    options,
    value,
  })

export default SelectPeriod