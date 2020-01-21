import njsx from 'njsx'
import { header, div, a } from 'njsx-react'
import { ReactNode } from 'react'
import * as Feather from 'react-feather'

import { repoLink } from 'src/data/constants'
import { tw } from 'src/utils'

const GitHub = njsx(Feather.GitHub)

const Logo = a(
  tw('mr-auto', 'opacity-75', 'transition-opacity')
)({
  href: repoLink,
})(GitHub({ size: '3em', strokeWidth: 1 }))

const AppBar = (children: ReactNode[]) =>
  header(
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
  )(
    div(
      tw(
        'relative',
        'flex',
        'items-center',
        'w-full',
        'h-20',
        'px-4'
      )
    )([Logo(), ...children])
  )

export default AppBar
