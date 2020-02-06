import { storiesOf } from '@storybook/react'
import { useState } from 'react'
import { OptionType as PeriodType } from 'src/data/period'
import { Period, Language } from 'src/components/select'
import {
  allLanguages,
  OptionType as LanguageType,
} from 'src/data/languages'
import { div } from 'njsx-react'
import { tw } from 'src/utils'

storiesOf('Select', module)
  .addDecorator(storyFn =>
    div(
      tw(
        'justify-center',
        'flex',
        'bg-gray-800',
        'mt-24',
        'items-center',
        'border',
        'border-gray-900',
        'rounded',
        'h-64',
        'm-auto',
        'w-4/6'
      )
    )(storyFn())()
  )
  .add('Date Period', () => {
    const period = useState<PeriodType>({
      label: 'Monthly',
      value: 'month',
    })
    return Period(period)()
  })
  .add('Language', () => {
    const language = useState<LanguageType>(allLanguages)
    return Language(language)()
  })
