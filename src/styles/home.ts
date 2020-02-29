import { h1, main, button } from 'njsx-react'
import { tw } from 'src/utils'

export const heading = h1(
  tw('mt-6', 'text-2xl', 'text-center')
)

export const app = main(
  tw(
    'justify-center',
    'items-center',
    'flex',
    'flex-col',
    'pt-24',
    'mb-10'
  )
)

export const Button = button(
  tw(
    'px-4',
    'py-2',
    'font-semibold',
    'rounded',
    'text-white',
    'bg-blue',
    'duration-300',
    'ease-in-out',
    'transition-all',
    'hover:bg-lightBlue',
    'transform',
    'hover:shadow-xl',
    'hover:-translate-y-1',
    'focus:outline-none'
  )
)
