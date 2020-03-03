import { ul } from 'njsx-react'
import { tw } from 'src/utils'

export const list: typeof ul = ul(
  tw(
    'w-11/12',
    'md:w-10/12',
    'mt-6',
    'mx-auto',
    'overflow-hidden',
    'list-none',
    'bg-gray-800',
    'border',
    'border-gray-900',
    'rounded-lg',
    'shadow-xl'
  )
)
