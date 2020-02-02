import { storiesOf } from '@storybook/react'
import { div } from 'njsx-react'
import FunctionalSelect from './select.functional'
import ReactSelect from './select.period'
import { tw } from 'src/utils'

const container = div(
  tw('p-56', 'bg-gray-800', 'flex', 'h-full')
)

storiesOf('Select', module).add('Functional', () =>
  container([
    FunctionalSelect([
      {
        label: 'Monthly',
        value: 'month',
      },
      ({ value }) => {
        window.alert(value)
      },
    ]),
    ReactSelect([
      {
        label: 'Monthly',
        value: 'month',
      },
      ({ value }) => {
        window.alert(value)
      },
    ]),
  ])()
)
