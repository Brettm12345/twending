/** @jsx jsx */
import { jsx } from '@emotion/core'
import { GitHub } from 'react-feather'
import { cn } from 'ts-classnames'
import { FC, ReactNode } from 'react'

interface AppBarProps {
  children?: ReactNode
}

const AppBar: FC<AppBarProps> = ({ children }) => (
  <header
    className={cn(
      'fixed',
      'top-0',
      'right-0',
      'z-50',
      'flex',
      'w-full',
      'bg-gray-800',
      'shadow-md'
    )}
  >
    <div
      className={cn(
        'relative',
        'flex',
        'items-center',
        'w-full',
        'h-20',
        'px-4'
      )}
    >
      <a
        className={cn(
          'mr-16',
          'opacity-75',
          'hover:opacity-100',
          'transition-opacity'
        )}
        href="https://github.com/brettm12345/twending"
      >
        <GitHub size="3em" strokeWidth={1} />
      </a>
      <div
        className={cn('flex', 'justify-end')}
        css={{ width: 'calc(100vw - 9em)' }}
      >
        {children}
      </div>
    </div>
  </header>
)

export default AppBar
