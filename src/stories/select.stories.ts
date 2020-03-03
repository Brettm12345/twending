import { storiesOf } from '@storybook/react'
import { div } from 'njsx-react'
import { useState } from 'react'
import { Period, Language } from 'src/components'
import {
  allLanguages,
  OptionType as LanguageType,
} from 'src/data/languages'
import { OptionType as PeriodType } from 'src/data/period'
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
    // @ts-ignore
    return Period(period)()
  })
  .add('Language', () => {
    const language = useState<LanguageType>(allLanguages)
    // @ts-ignore
    return Language(language)()
  })
