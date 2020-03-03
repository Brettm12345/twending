import { FC } from 'react'
import Select from './select'
import language from 'src/components/language'
import { options, OptionType } from 'src/data/languages'

const renderOptionLabel: FC<OptionType> = ({ label }) =>
  language(label)()

const SelectLanguage = Select({
  blurInputOnSelect: true,
  options,
  renderOptionLabel,
})

export default SelectLanguage
