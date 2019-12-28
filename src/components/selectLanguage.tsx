import Select from 'components/select'
import { options } from 'data/languages'
import { FC } from 'react'
import { Props } from 'react-select'
import cn from 'ts-classnames'
import { LanguageOption } from 'types'

import { OptionProps } from '@atlaskit/select'

import Language from './language'

const CustomOption: FC<OptionProps<LanguageOption>> = ({
  isDisabled,
  innerProps,
  label
}) =>
  !isDisabled ? (
    <div
      className={cn("p-2", "px-3", "hover:bg-gray-600", "select__option")}
      {...innerProps}
    >
      <Language>{label}</Language>
    </div>
  ) : null;

const SelectLanguage: FC<Props<LanguageOption>> = props => (
  <Select
    {...props}
    options={options}
    components={{
      Option: CustomOption
    }}
  />
);

export default SelectLanguage;
