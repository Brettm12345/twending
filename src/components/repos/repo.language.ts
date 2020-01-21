import styled from '@emotion/styled'
import njsx from 'njsx'
import cn from 'ts-classnames'
import { flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda'

import { getColor } from 'data/languages/utils'
interface LanguageProps {
  children: string
}

const Language = njsx(styled('span')<LanguageProps>`
  &::before {
    background-color: ${flow(prop('children'), getColor)};
  }
`)({ className: cn('language') })

export default Language
