import dayjs from 'dayjs'
import * as RD from '@devexperts/remote-data-ts'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { Errors } from 'io-ts'
import { RemoteData } from '@devexperts/remote-data-ts'
import { Task, task } from 'fp-ts/lib/Task'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { map, array } from 'fp-ts/lib/Array'
import {
  constant,
  flow,
  identity as id,
} from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'

import { Value as Period } from 'data/period'
import {
  Repo,
  GithubResponse,
  transformResponse,
} from 'data/github'
import { SpecificLanguage } from 'data/languages'
import { get, join, joinRD } from 'utils'

type GH = (q: string) => TaskEither<Errors, GithubResponse>
const gh: GH = q =>
  pipe(
    get(
      `https://api.github.com/search/repositories?sort=stars&order=desc&q=${q}`
    ),
    T.map(GithubResponse.decode)
  )

const param = (k: string) => (v: string): string =>
  pipe([k, v], join(':'))

type GetLanguage = (l: string) => string
const getLanguage: GetLanguage = flow(
  SpecificLanguage.decode,
  fold(constant(''), param('language'))
)

type GetPage = (period: Period) => (value: number) => string
const getPage: GetPage = period => page =>
  pipe(
    [page + 1, page],
    map(value =>
      dayjs()
        .subtract(value, period)
        .format('YYYY-MM-DD')
    ),
    join('..'),
    param('created')
  )

interface QueryOptions {
  /** @default month */
  period?: Period

  /** @default 0 */
  page?: number

  /** @default "All Languages" */
  language?: string
}

type QueryFn<T> = (o: QueryOptions) => T

const getQuery: QueryFn<string> = ({
  period = 'month',
  page = 0,
  language = 'All Languages',
}) =>
  pipe(
    [getLanguage(language), getPage(period)(page)],
    join(' ')
  )

type RemoteRepos = RemoteData<Errors, Repo[]>
type RepoTask = Task<RemoteRepos>

export const fetchRepos: QueryFn<RepoTask> = flow(
  getQuery,
  gh,
  TE.map(transformResponse),
  T.map(RD.fromEither)
)

interface UseReposResult {
  repos: RemoteRepos
  loading: boolean
  fetchMore: Task<void>
}

type UseRepos = (
  o: Omit<QueryOptions, 'page'>
) => UseReposResult
export const useRepos: UseRepos = (o = {}) => {
  const page = useNumber(0)
  const loading = useBoolean(false)
  const [repos, setRepos] = useState<RemoteRepos>(
    RD.initial
  )

  type SetWith = (fn: RepoTask) => Task<void>
  const setWith: SetWith = flow(id, T.map(setRepos))

  const getRepos: RepoTask = fetchRepos({
    ...o,
    page: page.value,
  })

  const getMore: RepoTask = pipe(
    getRepos,
    T.map(joinRD(repos))
  )

  const fetchMore: Task<void> = async () => {
    loading.setTrue()
    page.increase()
    await setWith(getMore)()
    loading.setFalse()
  }

  useEffect(() => {
    pipe(
      [T.of(RD.pending), getRepos],
      map(setWith),
      array.sequence(task)
    )()
  }, [o.language, o.period])

  return {
    fetchMore,
    loading: loading.value,
    repos,
  }
}
