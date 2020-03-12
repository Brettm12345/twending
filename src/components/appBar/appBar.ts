import njsx from 'njsx'
import { ReactNode } from 'react'
import * as Feather from 'react-feather'

import { Header, Toolbar, Logo } from './appBar.styles'

import { repoLink } from 'src/data/constants'

const GitHub = njsx(Feather.GitHub)

const AppBar = (children: ReactNode[]): typeof Header =>
  Header(
    Toolbar([
      Logo({ href: repoLink })(
        GitHub({ size: '3em', strokeWidth: 1 })
      ),
      ...children,
    ])
  )

export default AppBar
