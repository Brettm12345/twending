import * as RD from '@devexperts/remote-data-ts'
import Octokit, {
  SearchReposResponse as SearchResponse,
  Response,
} from '@octokit/rest'
import dayjs from 'dayjs'
import { map, array } from 'fp-ts/lib/Array'
import { fold, toError } from 'fp-ts/lib/Either'
import { constant, flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import { Task, task } from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { useEffect, useState } from 'react'
import createPersistedState from 'use-persisted-state'

import {
  RemoteRepos,
  RepoTask,
  handleResponse,
} from 'src/data/github'
import {
  SpecificLanguage,
  allLanguages,
  OptionType as LanguageType,
} from 'src/data/languages'
import {
  Value as Period,
  OptionType as PeriodType,
} from 'src/data/period'
import { join, joinRD } from 'src/utils'

const octokit = new Octokit()

type GH = (
  q: string
) => TaskEither<Error, Response<SearchResponse>>
const gh: GH = q =>
  TE.tryCatch(
    () =>
      octokit.search.repos({
        order: 'desc',
        q,
        sort: 'stars',
      }),
    toError
  )

const param = (k: string) => (v: string): string =>
  pipe([k, v], join(':'))

const getLanguage = flow(
  SpecificLanguage.decode,
  fold(constant(''), param('language'))
)

const getPage = (period: Period, page: number): string =>
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
  period: Period
  page: number
  language: string
}

type QueryFn<T> = (o: QueryOptions) => T

const buildQuery: QueryFn<string> = ({
  period,
  page,
  language,
}) =>
  pipe(
    [getLanguage(language), getPage(period, page)],
    join('+')
  )

export const fetchRepos: QueryFn<RepoTask> = flow(
  buildQuery,
  gh,
  TE.map(handleResponse),
  T.map(RD.fromEither)
)

const usePeriod = createPersistedState('period')
const useLanguage = createPersistedState('language')

type SelectInput<T> = [T, (value: T) => void]
interface UseReposResult {
  repos: RemoteRepos
  loading: boolean
  nextPage: () => Promise<void>
  language: SelectInput<LanguageType>
  period: SelectInput<PeriodType>
}

export const useRepos = (): UseReposResult => {
  const period = usePeriod<PeriodType>({
    label: 'Monthly',
    value: 'month',
  })
  const language = useLanguage<LanguageType>(allLanguages)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [repos, setRepos] = useState<RemoteRepos>(
    RD.initial
  )

  type SetWith = (fn: RepoTask) => Task<void>
  const setWith: SetWith = T.map(setRepos)

  const getRepos = (page = 0): RepoTask =>
    fetchRepos({
      language: language[0].value,
      page,
      period: period[0].value,
    })

  const nextPage = async () => {
    const current = page + 1
    setLoading(true)
    await setWith(
      pipe(getRepos(current), T.map(joinRD(repos)))
    )()
    setLoading(false)
    setPage(current)
  }

  useEffect(() => {
    pipe(
      [T.of(RD.pending), getRepos()],
      map(setWith),
      array.sequence(task)
    )()
    setPage(0)
  }, [language[0].value, period[0].value])

  return {
    language,
    loading,
    nextPage,
    period,
    repos,
  }
}
