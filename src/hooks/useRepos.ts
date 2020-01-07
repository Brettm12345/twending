import dayjs from 'dayjs'
import { flatten, map } from 'fp-ts/lib/Array'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'
import fetch from 'isomorphic-fetch'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'
import { Period, Repo } from 'types'

import * as rd from '@devexperts/remote-data-ts'

import {
  GithubResponse,
  transformResponse,
} from '../data/github'

const BASE_URL =
  'https://api.github.com/search/repositories?sort=stars&order=desc&q='

interface FetchReposOptions {
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

const fetchGithubRepos = ({
  period = 'month',
  page = 0,
  language = 'All Languages',
}: FetchReposOptions = {}) =>
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
    ([lang, dateRange]) => `${BASE_URL}${lang}${dateRange}`,
    query => async () =>
      pipe(await fetch(query), response =>
        response.json().then(GithubResponse.decode)
      )
  )

export const fetchRepos = flow(
  fetchGithubRepos,
  TE.map(transformResponse),
  T.map(rd.fromEither)
)

type Repos = rd.RemoteData<t.Errors, Repo[]>

interface UseReposResult {
  repos: Repos
  loading: boolean
  fetchMore: () => Promise<void>
}

export const useRepos = (
  options: Omit<FetchReposOptions, 'page'> = {}
): UseReposResult => {
  const page = useNumber(0)
  const loading = useBoolean(false)
  const [repos, setRepos] = useState<Repos>(rd.initial)

  const setReposWith = async (f: T.Task<Repos>) => {
    pipe(f, T.map(setRepos))()
  }

  const getRepos = fetchRepos({
    ...options,
    page: page.value,
  })

  const getMoreRepos = pipe(
    getRepos,
    T.map(r => rd.combine(repos, r)),
    T.map(rd.map(flatten))
  )

  const fetchMore = async () => {
    loading.setTrue()
    page.increase()
    setReposWith(getMoreRepos)
    loading.setFalse()
  }

  useEffect(() => {
    setReposWith(T.of(rd.pending))
    setReposWith(getRepos)
  }, [options.language, options.period])

  return {
    fetchMore,
    loading: loading.value,
    repos,
  }
}
