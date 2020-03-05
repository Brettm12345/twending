import { map, range } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import njsx from 'njsx'

import styled, { keyframes } from 'styled-components'
import { colors } from 'src/data/theme'

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

const skeletonItem = styled.span`
  background-color: ${gray[600]};
  border-radius: 2px;
  display: inline-block;
  line-height: 1;
  width: 100%;
  animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
`

interface SkeletonProps {
  count?: number
  width?: number | string
  height?: number | string
  circle?: boolean
}

const Skeleton = ({
  count = 1,
  height,
  width,
}: SkeletonProps) =>
  pipe(
    range(1, count),
    map(key =>
      njsx(skeletonItem)({
        key,
        style: { height, width },
      })
    )
  )

export default Skeleton
