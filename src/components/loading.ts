import { map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { svg, animate, circle, g } from 'njsx-react'

import theme from 'src/data/theme'
import { concat } from 'src/utils'

const size = 80
const color = theme.colors.primary

const Circle = circle({
  cx: 22,
  cy: 22,
  r: 6,
})

const Animate = animate({
  calcMode: 'linear',
  dur: '3s',
  repeatCount: 'indefinite',
})

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
      map(x =>
        Circle({ strokeOpacity: 0 })(
          pipe(
            [
              ['r', '6;12'],
              ['stoke-opacity', '1;0'],
              ['stroke-width', '2;0'],
            ],
            map(([attributeName, values]) =>
              Animate({
                attributeName,
                begin: `${x}s`,
                values,
              })
            )
          )
        )
      ),
      concat(
        Circle({ r: 8 })(
          Animate({
            attributeName: 'r',
            begin: '0s',
            dur: '1.5s',
            values: '6;1;2;3;4;5;6',
          })
        )
      )
    )
  )
)

export default Loading
