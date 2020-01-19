import 'styles/global.scss'
import 'assets/fonts/futura'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { cn } from 'ts-classnames'
import React, { FC } from 'react'
import createPersistedState from 'use-persisted-state'

import AppBar from 'components/appBar'
import Head from 'components/head'
import Loading from 'components/loading'
import Repos from 'components/repos'
import * as Select from 'components/select'
import type { OptionType as Period } from 'data/period'
import { OptionType as Language, allLanguages } from 'data/languages'
import { useRepos } from 'hooks/useRepos'

const usePeriod = createPersistedState('period')
const useLanguage = createPersistedState('language')

const Home: FC = () => {
  const [period, setPeriod] = usePeriod<Period>({
    label: 'Monthly',
    value: 'month',
  })

  const [language, setLanguage] = useLanguage<Language>(
    allLanguages
  )

  const { repos, nextPage, loading } = useRepos({
    language: language.value,
    period: period.value,
  })

  return (
    <>
      <Head />
      <main>
        <AppBar>
          <Select.Language
            onChange={setLanguage as VoidFunction}
            value={language}
          />
          <Select.Period
            onChange={setPeriod as VoidFunction}
            value={period}
          />
        </AppBar>
        <h1>Trending Repositories</h1>
        <Repos repos={repos} />
        <div className={cn('mt-6')}>
          {loading ? (
            <Loading />
          ) : (
            <button onClick={nextPage}>
              Load next {period.value}
            </button>
          )}
        </div>
      </main>
    </>
  )
}

export default Home
