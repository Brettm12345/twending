import { map, range } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import njsx from 'njsx'

import styled, { keyframes } from 'styled-components'
import { colors } from 'src/data/theme'

const { gray } = colors

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const skeletonItem = styled.span`
  background-color: ${gray[600]};
  background-image: linear-gradient(
    90deg,
    ${gray[600]},
    ${gray[700]},
    ${gray[600]}
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  display: inline-block;
  line-height: 1;
  width: 100%;
  animation: ${skeletonKeyframes} 1.2s ease-in-out infinite;
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
