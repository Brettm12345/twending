import 'styles/global.css'
import 'assets/fonts/futura'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { cn } from 'ts-classnames'
import React, { FC } from 'react'
import createPersistedState from 'use-persisted-state'

import AppBar from 'components/appBar'
import Head from 'components/head'
import Loading from 'components/loading'
import Root from 'components/repoList'
import SelectLanguage from 'components/selectLanguage'
import SelectPeriod from 'components/selectPeriod'
import { useRepos } from 'hooks/useRepos'
import { makeOption } from '../util'
import { LanguageOption, PeriodOption } from 'types'

const usePeriod = createPersistedState('period')
const useLanguage = createPersistedState('language')

const Home: FC = () => {
  const [period, setPeriod] = usePeriod<PeriodOption>({
    label: 'Monthly',
    value: 'month',
  })

  const [language, setLanguage] = useLanguage<
    LanguageOption
  >(makeOption('All Languages'))

  const { repos, fetchMore, loading } = useRepos({
    language: language.value,
    period: period.value,
  })

  return (
    <>
      <Head />
      <main
        className={cn(
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'pt-24',
          'mb-10'
        )}
      >
        <AppBar>
          <SelectLanguage
            isLoading={loading}
            onChange={setLanguage as any}
            value={language}
          />
          <SelectPeriod
            isLoading={loading}
            onChange={setPeriod as any}
            value={period}
          />
        </AppBar>
        <h1
          className={cn('mt-6', 'text-2xl', 'text-center')}
        >
          Trending Repositories
        </h1>
        <Root repos={repos} />
        <div className={cn('mt-6')}>
          {loading ? (
            <Loading />
          ) : (
            <button
              className={cn('btn', 'btn-blue')}
              onClick={fetchMore}
            >
              Load next {period.value}
            </button>
          )}
        </div>
      </main>
    </>
  )
}

export default Home
