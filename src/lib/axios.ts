import {
  fromEither,
  RemoteData,
} from '@devexperts/remote-data-ts'
import { flow } from 'fp-ts/lib/function'
import { Task } from 'fp-ts/lib/Task'
import * as T from 'fp-ts/lib/Task'

import { Request } from 'axios-fp-ts/lib/client'
import { HttpError } from 'axios-fp-ts/lib/error'
import { toTaskEither } from 'axios-fp-ts/lib/taskEither'

export const toRemoteData: <A>(
  req: Request<A>
) => Task<RemoteData<HttpError, A>> = flow(
  toTaskEither,
  T.map(fromEither)
)
