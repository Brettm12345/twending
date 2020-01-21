import 'styles/global.scss'

import { button, div, h1, main } from 'njsx-react'
import { FC } from 'react'

import Head from 'components/head'
import AppBar from 'components/appBar'
import Loading from 'components/loading'
import Repos from 'components/repos'
import { Language, Period } from 'components/select'
import { useRepos } from 'hooks/useRepos'
import { tw } from 'utils'

const Home: FC = () => {
  const {
    repos,
    nextPage,
    loading,
    language,
    period,
  } = useRepos()
  return main(
    tw(
      'justify-center',
      'items-center',
      'flex',
      'flex-col',
      'pt-24',
      'mb-10'
    )
  )([
    Head,
    AppBar([Language(language), Period(period)]),
    h1(tw('mt-6', 'text-2xl', 'text-center'))(
      'Trending Repositories'
    ),
    Repos(repos),
    div(tw('mt-6'))(
      loading
        ? Loading()
        : button(
            tw(
              'px-4',
              'py-2',
              'focus:outline-none',
              'font-semibold',
              'rounded',
              'text-white',
              'bg-blue-500',
              'hover:bg-blue-400',
              'transition-bg'
            )
          )({ onClick: nextPage })(
            `Load Next ${period[0].value}`
          )
    ),
  ])()
}

export default Home
