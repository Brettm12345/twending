import { svg, span } from 'njsx-react'
import { tw } from 'src/utils'

export const item = span(tw('inline-flex', 'mr-4'))

export const icon = svg(
  tw('fill-current', 'mr-1', '-mt-px')
)({
  height: '1.3em',
  viewBox: '0 0 14 16',
  width: '1.3em',
})
