import Select from './select'

import { options, OptionType } from 'src/data/period'

const SelectPeriod = Select<OptionType>({
  isSearchable: false,
  options,
})

export default SelectPeriod
