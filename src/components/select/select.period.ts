import Select from './select'

import { options, OptionType } from 'src/data/period'

const SelectPeriod = ([initialValue, onOptionChange]: [
  OptionType,
  (data: OptionType) => void
]) =>
  typeof window !== 'undefined' &&
  Select({
    initialValue,
    isSearchable: false,
    onOptionChange,
    options,
  })

export default SelectPeriod
