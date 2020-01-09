import { GitHub } from 'react-feather'
import React, { FC, ReactNode } from 'react'
import { tw } from 'utils'

interface AppBarProps {
  children?: ReactNode
}

const Header = tw('header')(
  'fixed',
  'top-0',
  'right-0',
  'z-50',
  'flex',
  'w-full',
  'bg-gray-800',
  'shadow-md'
)

const Toolbar = tw('div')(
  'relative',
  'flex',
  'items-center',
  'w-full',
  'h-20',
  'px-4'
)

const A = tw('a')(
  'mr-auto',
  'opacity-75',
  'transition-opacity'
)

const AppBar: FC<AppBarProps> = ({ children }) => (
  <Header>
    <Toolbar>
      <A href="https://github.com/brettm12345/twending">
        <GitHub size="3em" strokeWidth={1} />
      </A>
      {children}
    </Toolbar>
  </Header>
)

export default AppBar
