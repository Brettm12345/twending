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
import { Language, Period } from 'components/select'
import { useRepos } from 'hooks/useRepos'
import { LanguageOption, PeriodOption } from 'types'
import { makeOption } from 'utils'

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
          'center',
          'flex',
          'flex-col',
          'pt-24',
          'mb-10'
        )}
      >
        <AppBar>
          <Language
            onChange={setLanguage as any}
            value={language}
          />
          <Period
            onChange={setPeriod as any}
            value={period}
          />
        </AppBar>
        <h1
          className={cn('mt-6', 'text-2xl', 'text-center')}
        >
          Trending Repositories
        </h1>
        <Repos repos={repos} />
        <div className={cn('mt-6')}>
          {loading ? (
            <Loading />
          ) : (
            <button
              className={cn(
                'px-4',
                'py-2',
                'outline-none',
                'focus:outline-none',
                'font-semibold',
                'rounded',
                'text-white',
                'bg-blue-500',
                'transition-bg',
                'hover:bg-blue-400'
              )}
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
