import { ReactNode } from 'react'
import * as Feather from 'react-feather'
import { tw } from 'utils'
import njsx from 'njsx'
import { header, div, a } from 'njsx-react'

const GitHub = njsx(Feather.GitHub)

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
    )([
      a(tw('mr-auto', 'opacity-75', 'transition-opacity'))({
        href: 'https://github.com/brettm12345/twending',
      })(GitHub({ size: '3em', strokeWidth: 1 })),
      ...children,
    ])
  )

export default AppBar
