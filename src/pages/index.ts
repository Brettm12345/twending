import 'assets/fonts/futura'
import 'styles/global.scss'

import { button, div, h1, main } from 'njsx-react'
import { FC } from 'react'
import createPersistedState from 'use-persisted-state'

import AppBar from 'components/appBar'
import Loading from 'components/loading'
import Repos from 'components/repos'
import { Language, Period } from 'components/select'
import {
  allLanguages,
  OptionType as LanguageType,
} from 'data/languages'
import Head from 'components/head'
import { OptionType as PeriodType } from 'data/period'
import { useRepos } from 'hooks/useRepos'
import { tw } from 'utils'

const usePeriod = createPersistedState('period')
const useLanguage = createPersistedState('language')

const Home: FC = () => {
  const period = usePeriod<PeriodType>({
    label: 'Monthly',
    value: 'month',
  })

  const language = useLanguage<LanguageType>(allLanguages)

  const { repos, nextPage, loading } = useRepos({
    language: language[0].value,
    period: period[0].value,
  })

  return main([
    Head,
    AppBar([Language(language), Period(period)]),
    h1('Trending Repositories'),
    Repos(repos),
    div(tw('mt-6'))(
      loading
        ? Loading()
        : button({ onClick: nextPage })(
            `Load Next ${period[0].value}`
          )
    ),
  ])()
}

export default Home
