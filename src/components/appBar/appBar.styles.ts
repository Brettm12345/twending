import { header, div, a } from 'njsx-react'
import { tw } from 'src/utils'

export const Logo = a(
  tw(
    'mr-auto',
    'opacity-75',
    'transition-opacity',
    'hidden',
    'sm:flex'
  )
)
export const Header = header(
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

export const Toolbar = div(
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
