import * as RD from '@devexperts/remote-data-ts'
import { flatten } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'

export const joinRD = <E, A>(
  a: RemoteData<E, A[]>
): Endomorphism<RemoteData<E, A[]>> => b =>
  pipe(RD.combine(a, b), RD.map(flatten))

export const joinRDWith = <E, A>(
  a: RemoteData<E, A[]>
): Endomorphism<Task<RemoteData<E, A[]>>> =>
  T.map(joinRD(a))
