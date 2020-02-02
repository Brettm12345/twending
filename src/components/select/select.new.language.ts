import Select from './select.new'

import Language from 'src/components/repos/repo.language'
import { options, OptionType } from 'src/data/languages'

const SelectLanguage = ([initialValue, onOptionChange]: [
  OptionType,
  (a: OptionType) => void
]) =>
  typeof window !== 'undefined' &&
  Select({
    blurInputOnSelect: true,
    initialValue,
    onOptionChange,
    options: options.flatMap(a => a.options),
    renderOptionLabel: ({ label }: OptionType) =>
      Language(label)(),
  })

export default SelectLanguage
