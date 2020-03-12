import { header, div, a } from 'njsx-react'
import { tw } from 'lib'

export const Logo: typeof a = a(
  tw(
    'mr-auto',
    'opacity-75',
    'transition-opacity',
    'hidden',
    'sm:flex'
  )
)
export const Header: typeof header = header(
  tw(
    'fixed',
    'top-0',
    'right-0',
    'z-50',
    'flex',
    'w-full',
    'bg-gray-800',
    'shadow-md'
  )
)

export const Toolbar: typeof div = div(
  tw(
    'relative',
    'flex',
    'justify-between',
    'items-center',
    'w-full',
    'h-20',
    'px-4'
  )
)
