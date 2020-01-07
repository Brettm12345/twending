import { cn } from 'ts-classnames'
import React, { FC } from 'react'

import { getColor } from 'data/languages'

interface LanguageProps {
  children: string
}

const Language: FC<LanguageProps> = ({ children }) => (
  <span className={cn('inline-flex', 'mr-4')}>
    <span
      className={cn(
        'relative',
        'w-4',
        'h-4',
        'mr-1',
        'text-gray-400',
        'rounded-full'
      )}
      style={{
        backgroundColor: getColor(children),
        bottom: '-0.1em',
      }}
    />
    <span
      className={cn(
        'whitespace-no-wrap',
        'overflow-x-hidden',
        'ellipsis'
      )}
    >
      {children}
    </span>
  </span>
)

export default Language
