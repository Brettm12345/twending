import { map, range } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import * as CSS from 'csstype'
import { keyframes } from 'styled-components'

import { styled } from 'lib'
import { colors } from 'src/styles/theme'

const { gray } = colors

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

const item = styled('span')`
  background-color: ${gray[600]};
  border-radius: 2px;
  display: inline-block;
  line-height: 1;
  width: 100%;
  animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
`

interface SkeletonProps extends CSS.Properties {
  count?: number
  circle?: boolean
}

const Skeleton = ({
  count = 1,
  circle = false,
  ...style
}: SkeletonProps): Array<typeof item> =>
  pipe(
    range(1, count),
    map(key =>
      item({
        key,
        style: circle
          ? { borderRadius: '100%', ...style }
          : style,
      })
    )
  )

export default Skeleton
