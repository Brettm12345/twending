import * as RD from '@devexperts/remote-data-ts'
import { map, array } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import { task } from 'fp-ts/lib/Task'
import { useEffect, useState } from 'react'
import { useBoolean, useNumber } from 'react-hanger'
import createPersistedState from 'use-persisted-state'

import fetchRepos from './fetchRepos'

import { RemoteRepos } from 'src/data/github'
import {
  allLanguages,
  OptionType as LanguageType,
} from 'src/data/languages'
import { OptionType as PeriodType } from 'src/data/period'
import { joinRDWith } from 'src/utils'

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
  const loading = useBoolean(false)
  const page = useNumber(0)
  const [repos, setRepos] = useState<RemoteRepos>(
    RD.initial
  )

  const setWith = T.map(setRepos)
  const getRepos = fetchRepos({
    language: language[0].value,
    period: period[0].value,
  })

  const fetchMore = pipe(
    getRepos(page.value + 1),
    joinRDWith(repos),
    setWith
  )

  const nextPage = async () => {
    page.increase()
    loading.setTrue()
    await fetchMore()
    loading.setFalse()
  }

  useEffect(() => {
    pipe(
      [T.of(RD.pending), getRepos()],
      map(setWith),
      array.sequence(task)
    )()
    page.setValue(0)
  }, [language[0].value, period[0].value])

  return {
    language,
    loading: loading.value,
    nextPage,
    period,
    repos,
  }
}
