import { flow } from 'fp-ts/lib/function'
import { svg, path, span } from 'njsx-react'
import * as R from 'fp-ts/lib/Record'
import { FunctionN as FN } from 'fp-ts/lib/function'

import { tw } from 'utils'
import { ReactNode } from 'react'
import { map } from 'fp-ts/lib/Array'

const icons = {
  forks:
    'M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z',
  issues:
    'M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z',
  stars:
    'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z',
}

export type IconName = keyof typeof icons

const Icon = (name: IconName) =>
  svg(tw('fill-current', 'mr-1'))({
    height: '1.3em',
    viewBox: '0 0 14 16',
    width: '1.3em',
  })(path({ d: icons[name], fillRule: 'evenodd' }))

type Icons = FN<
  [Record<IconName, ReactNode>],
  Array<typeof span>
>
const Icons: Icons = flow(
  R.toArray,
  map(([key, value]) =>
    span(tw('inline-flex', 'mr-4'))([Icon(key), value])
  )
)

export default Icons
