import * as RD from '@devexperts/remote-data-ts'
import { get } from 'axios-fp-ts/lib/client'
import { expected } from 'axios-fp-ts/lib/expected'
import { array, map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import * as QS from 'query-string'
import * as T from 'fp-ts/lib/Task'
import { task } from 'fp-ts/lib/Task'
import { useEffect, useState } from 'react'
import { useNumber } from 'react-hanger'
import makePersistedState from 'use-persisted-state'

import { ApiResponse, Query, RemoteRepos } from 'api'
import { joinRD, toRemoteData } from 'lib'
import {
  allLanguages,
  OptionType as LanguageType,
} from 'src/data/languages'
import { OptionType as PeriodType } from 'src/data/period'

export const fetchRepos = (
  query: Query
): Task<RemoteRepos> =>
  toRemoteData(
    get(
      QS.stringifyUrl({
        url: '/api',
        query: query as QS.ParsedQuery,
      }),
      expected(ApiResponse)
    )
  )

const usePeriod = makePersistedState('period')
const useLanguage = makePersistedState('language')

type SelectInput<T> = [T, (value: T) => void]
interface UseReposResult {
  repos: RemoteRepos
  loadNextPage: IO<void>
  language: SelectInput<LanguageType>
  period: SelectInput<PeriodType>
}

const useRepos = (): UseReposResult => {
  const period = usePeriod<PeriodType>({
    label: 'Monthly',
    value: 'month',
  })
  const language = useLanguage<LanguageType>(allLanguages)
  const page = useNumber(0)
  const [repos, setRepos] = useState<RemoteRepos>(
    RD.initial
  )

  const setWith = T.map(setRepos)
  const getRepos = (page?: number) =>
    fetchRepos({
      language: language[0].value,
      page: page?.toString(),
      period: period[0].value,
    })

  const fetchMore = getRepos(page.value + 1)

  const [nextPage, setNextPage] = useState<RemoteRepos>(
    RD.initial
  )

  const fetchNextPage = pipe(fetchMore, T.map(setNextPage))

  const loadNextPage = () => {
    pipe(nextPage, joinRD(repos), setRepos)
    page.increase()
  }

  useEffect(() => {
    fetchNextPage()
  }, [page.value])

  useEffect(() => {
    page.setValue(0)
    setRepos(RD.pending)
    setNextPage(RD.pending)
  }, [language[0].value, period[0].value])

  useEffect(() => {
    pipe(
      [T.of(RD.pending), getRepos()],
      map(setWith),
      array.sequence(task),
      T.chain(() => fetchNextPage)
    )()
  }, [language[0].value, period[0].value])

  return {
    language,
    loadNextPage,
    period,
    repos,
  }
}

export default useRepos
