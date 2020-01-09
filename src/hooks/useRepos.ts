import date from 'dayjs'
import fetch from 'unfetch'
import * as E from 'fp-ts/lib/Either'
import * as RD from '@devexperts/remote-data-ts'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { flatten, map } from 'fp-ts/lib/Array'
import {
  constant as c,
  flow as f,
  identity as id,
} from 'fp-ts/lib/function'
import { pipe as p } from 'fp-ts/lib/pipeable'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'

import { SpecificLanguage } from 'data/languages'
import {
  GithubResponse,
  transformResponse,
} from 'data/github'
import { join } from 'utils'

type TaskEither<E, A> = TE.TaskEither<E, A>
type RemoteData<E, A> = RD.RemoteData<E, A>
type Task<T> = T.Task<T>
type Errors = import('io-ts').Errors

type Period = import('data/period').Value
type Repo = import('data/github').Repo

type Get = (...a: Parameters<typeof fetch>) => Task<any>
const get: Get = f(fetch, c)

type GH = (q: string) => TaskEither<Errors, GithubResponse>
const gh: GH = q =>
  p(
    `https://api.github.com/search/repositories?sort=stars&order=desc&q=${q}`,
    get,
    T.chain(r => c(r.json())),
    T.map(GithubResponse.decode)
  )

const transformDate = (p: Period) => (v: number): string =>
  date()
    .subtract(v, p)
    .format('YYYY-MM-DD')

const param = (k: string) => (v: string): string =>
  `${k}:${v}`

type GetLanguage = (l: string) => string
const getLanguage: GetLanguage = f(
  SpecificLanguage.decode,
  E.fold(c(''), param('language'))
)

type GetPage = (page: number, period: Period) => string
const getPage: GetPage = (page, period) =>
  p(
    [page + 1, page],
    map(transformDate(period)),
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

type GetQuery = (o: QueryOptions) => string
const getQuery: GetQuery = ({
  period = 'month',
  page = 0,
  language = 'All Languages',
}) => [getLanguage(language), getPage(page, period)].join()

type Repos = RemoteData<Errors, Repo[]>

type FetchRepos = (o: QueryOptions) => Task<Repos>
export const fetchRepos: FetchRepos = f(
  getQuery,
  gh,
  TE.map(transformResponse),
  T.map(RD.fromEither)
)

interface UseReposResult {
  repos: Repos
  loading: boolean
  fetchMore: Task<void>
}

type UseRepos = (
  o: Omit<QueryOptions, 'page'>
) => UseReposResult
export const useRepos: UseRepos = (o = {}) => {
  const page = useNumber(0)
  const loading = useBoolean(false)
  const [repos, setRepos] = useState<Repos>(RD.initial)

  type SetWith = (fn: Task<Repos>) => Task<void>
  const setWith: SetWith = f(id, T.map(setRepos))

  const getRepos: Task<Repos> = fetchRepos({
    ...o,
    page: page.value,
  })

  const getMore: Task<Repos> = p(
    getRepos,
    T.map(r => RD.combine(repos, r)),
    T.map(RD.map(flatten))
  )

  const fetchMore: Task<void> = async () => {
    loading.setTrue()
    page.increase()
    p(setWith(getMore), T.map(loading.setFalse))
  }

  useEffect(() => {
    p(setWith(T.of(RD.pending)), setWith(getRepos))
  }, [o.language, o.period])

  return {
    fetchMore,
    loading: loading.value,
    repos,
  }
}
