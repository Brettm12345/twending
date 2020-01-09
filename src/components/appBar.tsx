import { GitHub } from 'react-feather'
import React, { FC, ReactNode } from 'react'

interface AppBarProps {
  children?: ReactNode
}

const AppBar: FC<AppBarProps> = ({ children }) => (
  <header>
    <div>
      <a href="https://github.com/brettm12345/twending">
        <GitHub size="3em" strokeWidth={1} />
      </a>
      <div>{children}</div>
    </div>
  </header>
)

export default AppBar
