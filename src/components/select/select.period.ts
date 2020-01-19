import Select from './select'

import { options } from 'data/period'

const SelectPeriod = Select({
  isSearchable: false,
  options,
})

export default SelectPeriod
