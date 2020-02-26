import * as RD from '@devexperts/remote-data-ts'
import axios from 'axios'
import { map, array } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'

import { task } from 'fp-ts/lib/Task'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'
import createPersistedState from 'use-persisted-state'

import {
  allLanguages,
  OptionType as LanguageType,
} from 'src/data/languages'
import { OptionType as PeriodType } from 'src/data/period'
import {
  Query,
  RemoteRepos,
  ApiResponse,
} from 'src/pages/api'
import { joinRD } from 'src/utils'

const fetchRepos = (params: Query) =>
  pipe(
    () =>
      axios.get('/api', {
        params,
      }),
    T.map(({ data }) =>
      pipe(ApiResponse.decode(data), RD.fromEither)
    )
  )

const usePeriod = createPersistedState('period')
const useLanguage = createPersistedState('language')

type SelectInput<T> = [T, (value: T) => void]
interface UseReposResult {
  repos: RemoteRepos
  loading: boolean
  loadNextPage: IO<void>
  language: SelectInput<LanguageType>
  period: SelectInput<PeriodType>
}

export const useRepos = (): UseReposResult => {
  const period = usePeriod<PeriodType>({
    label: 'Monthly',
    value: 'month',
  })
  const language = useLanguage<LanguageType>(allLanguages)
  const loading = useBoolean(false)
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
    page.increase()
    loading.setTrue()
    pipe(nextPage, joinRD(repos), setRepos)
    loading.setFalse()
  }

  useEffect(() => {
    fetchNextPage()
  }, [page.value])

  useEffect(() => {
    pipe(
      [T.of(RD.pending), getRepos()],
      map(setWith),
      array.sequence(task),
      T.chain(() => fetchNextPage)
    )()
    page.setValue(0)
  }, [language[0].value, period[0].value])

  return {
    language,
    loadNextPage,
    loading: loading.value,
    period,
    repos,
  }
}
