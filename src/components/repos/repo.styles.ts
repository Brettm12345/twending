import { li, a, h3, p, div, time } from 'njsx-react'
import { tw } from 'src/utils'

export const repo = li(
  tw(
    'flex',
    'p-5',
    'pb-4',
    'hover:bg-gray-900',
    'transition-colors',
    'ease-in-out',
    'duration-200',
    'cursor-pointer',
    'border-b',
    'border-gray-900',
    'last:border-b-0',
    'sm:p-6',
    'md:p-8',
    'md:pb-5'
  )
)

export const link = a({
  rel: 'noopener noreferrer',
  target: '_blank',
})(tw('flex', 'flex-col', 'flex-grow', 'outline-none'))

export const title = h3(tw('text-lg', 'text-white'))

export const date = time(
  tw('text-xs', 'text-gray-400', 'mb-1')
)

export const description = p(
  tw('max-w-3xl', 'mb-4', 'text-gray-300', 'w-10/12')
)

export const info = div(
  tw('flex', 'mt-auto', 'text-sm', 'text-gray-400')
)
