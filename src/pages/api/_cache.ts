import dayjs from 'dayjs'
import { flow, unsafeCoerce } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import {
  left,
  right,
  TaskEither,
} from 'fp-ts/lib/TaskEither'
import { Errors } from 'io-ts'
import NodeCache from 'node-cache'
import { Repo } from './_types'
import { Value as Period } from 'src/data/period/types'

interface GitHubCache
  extends Omit<NodeCache, 'get' | 'set'> {
  get: (key: string) => Repo[] | null
  set: (
    key: string,
    value: Repo[],
    ttl: number | string
  ) => boolean
}
const nodeCache = new NodeCache({
  stdTTL: 0,
}) as GitHubCache

interface Cache {
  get: (key: string) => Option<Repo[]>
  set: (
    key: string
  ) => (data: Repo[]) => TaskEither<Errors, Repo[]>
}

export const cache: Cache = {
  get: flow(nodeCache.get, O.fromNullable),
  set: key => data =>
    nodeCache.set(key, data, 0)
      ? right(data)
      : left(
          unsafeCoerce(new Error('Failed to cache value'))
        ),
}

export const calculateMaxAge = (period: Period): number =>
  dayjs().diff(dayjs().add(1, period), 'second')
