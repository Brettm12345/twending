import njsx from 'njsx'
import styled from 'styled-components'
import { tw } from 'src/utils'

export const Button = njsx(styled.button.attrs(
  tw(
    'fixed',
    'mr-auto',
    'mb-10',
    'bg-blue-500',
    'p-4',
    'rounded-full'
  )
)`
  bottom: 0;
  left: 45px;
`)
