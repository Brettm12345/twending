import './global.css'

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
    'pt-24',
    'mb-10'
  )
)
