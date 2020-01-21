import styled from '@emotion/styled'
import { prop } from 'fp-ts-ramda'
import { flow } from 'fp-ts/lib/function'
import njsx from 'njsx'

import { getColor } from 'src/data/languages'
import { tw } from 'src/utils'

interface Props {
  children: string
}

const Language = njsx(styled('span')<Props>`
  &::before {
    background-color: ${flow(prop('children'), getColor)};
  }
`)(tw('language'))

export default Language
