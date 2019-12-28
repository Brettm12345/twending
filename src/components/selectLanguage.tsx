import Select from 'components/select'
import { options } from 'data/languages'
import { FC } from 'react'
import { Props } from 'react-select'
import { LanguageOption } from 'types'

const SelectLanguage: FC<Props<LanguageOption>> = props => (
  <Select {...props} options={options} />
);

export default SelectLanguage;
