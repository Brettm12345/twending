import date from 'dayjs'
import * as RD from '@devexperts/remote-data-ts'
import {
  Task,
  map as then,
  of as load,
} from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { flatten, map } from 'fp-ts/lib/Array'
import {
  constant as c,
  flow as f,
  identity as id,
} from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { pipe as p } from 'fp-ts/lib/pipeable'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'

import { SpecificLanguage } from 'data/languages'
import {
  GithubResponse,
  transformResponse,
} from 'data/github'
import { get, join } from 'utils'

type TaskEither<E, A> = TE.TaskEither<E, A>
type RemoteData<E, A> = RD.RemoteData<E, A>
type Errors = import('io-ts').Errors

type Period = import('data/period').Value
type Repo = import('data/github').Repo

type GH = (q: string) => TaskEither<Errors, GithubResponse>
const gh: GH = q =>
  p(
    get(
      `https://api.github.com/search/repositories?sort=stars&order=desc&q=${q}`
    ),
    then(GithubResponse.decode)
  )

const param = (k: string) => (v: string): string =>
  `${k}:${v}`

type GetLanguage = (l: string) => string
const getLanguage: GetLanguage = f(
  SpecificLanguage.decode,
  fold(c(''), param('language'))
)

type MkPage = (x: number) => [number, number]
const mkPage: MkPage = x => [x + 1, x]

type DateFn<T> = (period: Period) => (page: number) => T

const getDates: DateFn<string[]> = period =>
  f(
    mkPage,
    map(value =>
      date()
        .subtract(value, period)
        .format('YYYY-MM-DD')
    )
  )

const getPage: DateFn<string> = period =>
  f(getDates(period), join('..'), param('created'))
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
}) =>
  [getLanguage(language), p(page, getPage(period))].join()

type Repos = RemoteData<Errors, Repo[]>

type FetchRepos = (o: QueryOptions) => Task<Repos>
export const fetchRepos: FetchRepos = f(
  getQuery,
  gh,
  TE.map(transformResponse),
  then(RD.fromEither)
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
  const setWith: SetWith = f(id, then(setRepos))

  const getRepos: Task<Repos> = fetchRepos({
    ...o,
    page: page.value,
  })

  const getMore: Task<Repos> = p(
    getRepos,
    then(r => RD.combine(repos, r)),
    then(RD.map(flatten))
  )

  const fetchMore: Task<void> = async () => {
    loading.setTrue()
    page.increase()
    setWith(getMore)
    loading.setFalse()
  }

  useEffect(() => {
    p(RD.pending, load, setWith, then(setWith(getRepos)))()
  }, [o.language, o.period])

  return {
    fetchMore,
    loading: loading.value,
    repos,
  }
}
