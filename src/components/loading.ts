import { svg, animate, circle, g } from 'njsx-react'
import { pipe } from 'fp-ts/lib/pipeable'
import { map } from 'fp-ts/lib/Array'

import theme from 'data/theme'

const Circle = circle({
  cx: 22,
  cy: 22,
  r: 6,
  strokeOpacity: 0,
})

const Animate = animate({
  calcMode: 'linear',
  dur: '3s',
  repeatCount: 'indefinite',
})

const size = 80
const color = theme.colors.primary

const Loading = svg({
  'aria-label': 'Loading',
  height: size,
  stroke: color,
  viewBox: '0 0 45 45',
  width: size,
})(
  g({
    fill: 'none',
    fillRule: 'evenodd',
    strokeWidth: 2,
    transform: 'translate(1 1)',
  })(
    pipe(
      [1.5, 3],
      map(x => `${x}s`),
      map(begin =>
        Circle([
          Animate({
            attributeName: 'r',
            begin,
            values: '6;12',
          }),
          Animate({
            attributeName: 'stroke-opacity',
            begin,
            values: '1;0',
          }),
          Animate({
            attributeName: 'stroke-width',
            begin,
            values: '2;0',
          }),
        ])
      ),
      xs => [
        ...xs,
        Circle({ r: 8, strokeOpacity: undefined })(
          Animate({
            attributeName: 'r',
            begin: '0s',
            dur: '1.5s',
            values: '6;1;2;3;4;5;6',
          })
        ),
      ]
    )
  )
)

export default Loading
