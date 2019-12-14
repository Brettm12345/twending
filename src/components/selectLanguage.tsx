import Select from 'components/select'
import { options } from 'data/languages'
import React from 'react'
import { LanguageOption, SelectProps } from 'types'

const SelectLanguage: React.FC<SelectProps<LanguageOption>> = props => (
  <Select {...props} options={options} />
);

export default SelectLanguage;
