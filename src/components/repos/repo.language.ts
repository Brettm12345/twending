import styled from '@emotion/styled'
import njsx from 'njsx'
import { flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda'

import { getColor } from 'data/languages'
import { tw } from 'utils'

interface Props {
  children: string
}

const Language = njsx(styled('span')<Props>`
  &::before {
    background-color: ${flow(prop('children'), getColor)};
  }
`)(tw('language'))

export default Language
