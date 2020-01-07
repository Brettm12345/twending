import cn from 'ts-classnames'
import React, { FC } from 'react'
import Select, { Props } from 'react-select'

import Language from 'components/language'
import selectProps from 'data/selectProps'
import { options } from 'data/languages'
import { LanguageOption } from 'types'

const SelectLanguage: FC<Props<LanguageOption>> = props => (
  <Select
    {...selectProps}
    {...props}
    components={{
      Option: ({ isDisabled, innerProps, label }) =>
        !isDisabled ? (
          <div
            className={cn(
              'p-2',
              'px-3',
              'hover:bg-gray-600',
              'select__option'
            )}
            {...innerProps}
          >
            <Language>{label}</Language>
          </div>
        ) : null,
      SingleValue: ({ data: { label }, innerProps }) => (
        <div {...innerProps}>
          <Language>{label}</Language>
        </div>
      ),
    }}
    options={options}
  />
)

export default SelectLanguage
