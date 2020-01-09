/** @jsx jsx */
import { jsx } from '@emotion/core'
import { cn } from 'ts-classnames'
import { FC, HTMLAttributes } from 'react'

import { getColor } from 'data/languages/utils'

interface LanguageProps
  extends HTMLAttributes<HTMLSpanElement> {
  children: string
}

const Language: FC<LanguageProps> = ({
  children,
  ...rest
}) => (
  <span
    className={cn('language')}
    css={{
      '&::before': {
        backgroundColor: getColor(children),
      },
    }}
    {...rest}
  >
    {children}
  </span>
)

export default Language
