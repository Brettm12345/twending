import { h1, main, button, div } from 'njsx-react'
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
    'bg-blue-500',
    'transition-bg',
    'hover:bg-blue-500',
    'focus:outline-none'
  )
)

export const footer = div(tw('mt-6'))
