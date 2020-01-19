import styled from '@emotion/styled'
import cn from 'ts-classnames'
import { flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda'
import React, { FC } from 'react'

import { getColor } from 'data/languages/utils'
interface LanguageProps {
  children: string
}

const Dot = styled('span')<LanguageProps>`
  &::before {
    background-color: ${flow(prop('children'), getColor)};
  }
`

const Language: FC<LanguageProps> = ({ children }) => (
  <Dot className={cn('language')}>{children}</Dot>
)

export default Language
