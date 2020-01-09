import date from 'dayjs'
import fetch from 'unfetch'
import * as t from 'io-ts'
import * as E from 'fp-ts/lib/Either'
import * as RD from '@devexperts/remote-data-ts'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { flatten, map } from 'fp-ts/lib/Array'
import {
  flow as f,
  constant as c,
} from 'fp-ts/lib/function'
import { pipe as p } from 'fp-ts/lib/pipeable'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'

import { AllLanguages } from 'data/languages'
import {
  GithubResponse,
  transformResponse,
} from 'data/github'
import { join } from 'utils'

type Period = import('data/period').Value
type Repo = import('data/github').Repo

const gh = (
  q: string
): TE.TaskEither<t.Errors, GithubResponse> =>
  c(
    fetch(
      `https://api.github.com/search/repositories?sort=stars&order=desc&q=${q}`
    ).then(r => r.json().then(GithubResponse.decode))
  )

interface QueryOptions {
  /** @default month */
  period?: Period

  /** @default 0 */
  page?: number

  /** @default "All Languages" */
  language?: string
}

type TransformDate = (p: Period) => (v: number) => string
const transformDate: TransformDate = period => value =>
  date()
    .subtract(value, period)
    .format('YYYY-MM-DD')

type Param = (k: string) => (v: string) => string
const param: Param = k => v => p([k, v], join(':'))

type GetLanguage = (l: string) => string
const getLanguage: GetLanguage = f(
  AllLanguages.decode,
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

type GetQuery = (o: QueryOptions) => string
const getQuery: GetQuery = ({
  period = 'month',
  page = 0,
  language = 'All Languages',
}) => [getLanguage(language), getPage(page, period)].join()

type Repos = RD.RemoteData<t.Errors, Repo[]>

type FetchRepos = (options: QueryOptions) => T.Task<Repos>
export const fetchRepos: FetchRepos = f(
  getQuery,
  gh,
  TE.map(transformResponse),
  T.map(RD.fromEither)
)

interface UseReposResult {
  repos: Repos
  loading: boolean
  fetchMore: () => Promise<void>
}

type UseRepos = (
  o: Omit<QueryOptions, 'page'>
) => UseReposResult
export const useRepos: UseRepos = (o = {}) => {
  const page = useNumber(0)
  const loading = useBoolean(false)
  const [repos, setRepos] = useState<Repos>(RD.initial)

  type RepoTask = T.Task<Repos>

  type SetReposWith = (f: RepoTask) => T.Task<void>
  const setReposWith: SetReposWith = (f: RepoTask) =>
    p(f, T.map(setRepos))

  const getRepos: RepoTask = fetchRepos({
    ...o,
    page: page.value,
  })

  const getMoreRepos: RepoTask = p(
    getRepos,
    T.map(r => RD.combine(repos, r)),
    T.map(RD.map(flatten))
  )

  const fetchMore: T.Task<void> = async () => {
    loading.setTrue()
    page.increase()
    p(setReposWith(getMoreRepos), T.map(loading.setFalse))
  }

  useEffect(() => {
    p(
      setReposWith(T.of(RD.pending)),
      setReposWith(getRepos)
    )
  }, [o.language, o.period])

  return {
    fetchMore,
    loading: loading.value,
    repos,
  }
}
