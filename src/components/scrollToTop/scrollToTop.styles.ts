import { button } from 'njsx-react'
import { tw } from 'src/utils'

export const Button = button(
  tw(
    'fixed',
    'bottom-0',
    'left-0',
    'ml-16',
    'mb-10',
    'bg-blue',
    'focus:outline-none',
    'p-4',
    'rounded-full'
  )
)
