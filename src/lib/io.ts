import { array } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Record'
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import * as t from 'io-ts'

export const oneOf = (xs: string[]): Mixed =>
  pipe(
    R.fromFoldableMap(getLastSemigroup<string>(), array)(
      xs,
      x => [x, x]
    ),
    t.keyof
  )
