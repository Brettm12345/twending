import styled from '@emotion/styled'
import njsx from 'njsx'
import { flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda'

import { getColor } from 'data/languages/utils'
import { tw } from 'utils'
interface LanguageProps {
  children: string
}

const Language = njsx(styled('span')<LanguageProps>`
  &::before {
    background-color: ${flow(prop('children'), getColor)};
  }
`)(tw('language'))

export default Language
