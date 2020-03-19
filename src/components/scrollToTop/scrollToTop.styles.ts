import { button } from 'njsx-react'

import { tw } from 'lib'

export const Button: typeof button = button(
  tw(
    'fixed',
    'bottom-0',
    'left-0',
    'ml-16',
    'mb-10',
    'bg-blue',
    'hover:bg-lightBlue',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'p-4',
    'rounded-full'
  )
)
