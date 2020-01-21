import Select from './select'

import { options, OptionType } from 'src/data/period'

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
