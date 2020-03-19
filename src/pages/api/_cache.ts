import { badUrl } from 'axios-fp-ts/lib/error'
import dayjs from 'dayjs'
import { flow } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { left, right } from 'fp-ts/lib/TaskEither'
import NodeCache from 'node-cache'

import { Value as Period } from 'src/data/period/types'
import { Repo, RepoTaskEither } from './_types'

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
  set: (key: string) => (data: Repo[]) => RepoTaskEither
}

export const cache: Cache = {
  get: flow(nodeCache.get, O.fromNullable),
  set: key => data =>
    nodeCache.set(key, data, 0)
      ? right(data)
      : left(badUrl(`Bad url: ${key}`)),
}

export const calculateMaxAge = (period: Period): number =>
  dayjs()
    .add(1, period)
    .diff(dayjs(), 'second')
