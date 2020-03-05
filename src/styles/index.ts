import './index.css'

import { h1, main } from 'njsx-react'
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
    'caret-blue',
    'text-white',
    'font-sans',
    'bg-gray-700',
    'antialiased',
    'leading-normal',
    'pt-24',
    'mb-10'
  )
)
