import { a, img } from 'njsx-react'

import { tw } from 'lib'

export const link: typeof a = a(
  tw(
    'hidden',
    'flex-shrink-0',
    'pt-1',
    'mr-4',
    'p-0',
    'w-16',
    'outline-none',
    'xs:inline-block',
    'sm:w-20',
    'md:mr-8'
  )
)

export const avatar: typeof img = img(tw('rounded-lg'))({
  alt: 'Author avatar',
})
