import Select from './select'
import language from 'src/components/language'
import { options, OptionType } from 'src/data/languages'

const SelectLanguage = Select<OptionType>({
  blurInputOnSelect: true,
  options,
  renderOptionLabel: ({ label }) => language(label)(),
})

export default SelectLanguage
