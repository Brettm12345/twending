import dayjs from 'dayjs'
import fetch from 'unfetch'
import * as t from 'io-ts'
import * as RD from '@devexperts/remote-data-ts'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { flatten, map } from 'fp-ts/lib/Array'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'

import {
  GithubResponse,
  transformResponse,
} from 'data/github'
import { Period, Repo } from 'types'

const BASE_URL =
  'https://api.github.com/search/repositories?sort=stars&order=desc&q='

interface QueryOptions {
  /** @default month */
  period?: Period

  /** @default 0 */
  page?: number

  /** @default "All Languages" */
  language?: string
}

const transformDate = (period: Period) => (value: number) =>
  dayjs()
    .subtract(value, period)
    .format('YYYY-MM-DD')

const getQuery = ({
  period = 'month',
  page = 0,
  language = 'All Languages',
}: QueryOptions): string =>
  pipe(
    [
      language === 'All Languages'
        ? ''
        : `language:${language} `,
      pipe(
        [page + 1, page],
        map(transformDate(period)),
        ([from, to]) => `created:${from}..${to}`
      ),
    ],
    ([lang, dateRange]) => `${BASE_URL}${lang}${dateRange}`
  )

const fetchAndDecode = (type: t.Mixed) => (
  query: string
) => () =>
  fetch(query).then(r => r.json().then(type.decode))

type Repos = RD.RemoteData<t.Errors, Repo[]>

type FetchRepos = (options: QueryOptions) => T.Task<Repos>

export const fetchRepos: FetchRepos = flow(
  getQuery,
  fetchAndDecode(GithubResponse),
  TE.map(transformResponse),
  T.map(RD.fromEither)
)

interface UseReposResult {
  repos: Repos
  loading: boolean
  fetchMore: () => Promise<void>
}

export const useRepos = (
  options: Omit<QueryOptions, 'page'> = {}
): UseReposResult => {
  const page = useNumber(0)
  const loading = useBoolean(false)
  const [repos, setRepos] = useState<Repos>(RD.initial)

  const setReposWith = async (f: T.Task<Repos>) =>
    pipe(f, T.map(setRepos))()

  const getRepos = fetchRepos({
    ...options,
    page: page.value,
  })

  const getMoreRepos = pipe(
    getRepos,
    T.map(r => RD.combine(repos, r)),
    T.map(RD.map(flatten))
  )

  const fetchMore = async () => {
    loading.setTrue()
    page.increase()
    setReposWith(getMoreRepos)
    loading.setFalse()
  }

  useEffect(() => {
    setReposWith(T.of(RD.pending))
    setReposWith(getRepos)
  }, [options.language, options.period])

  return {
    fetchMore,
    loading: loading.value,
    repos,
  }
}
