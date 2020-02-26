import { div } from 'njsx-react'
import { FC } from 'react'

import 'src/styles/global.css'

import AppBar from 'src/components/appBar/appBar'
import Head from 'src/components/head'
import Loading from 'src/components/loading'
import Repos from 'src/components/repos'
import { Language, Period } from 'src/components/select'
import { useRepos } from 'src/hooks/useRepos'
import { app, heading, Button } from 'src/styles/home'
import { tw } from 'src/utils'

const Home: FC = () => {
  const {
    repos,
    loadNextPage,
    loading,
    language,
    period,
  } = useRepos()
  return app([
    Head(),
    AppBar([Language(language), Period(period)]),
    heading('Trending Repositories'),
    Repos(repos),
    div(tw('mt-6'))(
      loading
        ? Loading()
        : Button({ onClick: loadNextPage })(
            `Load next ${period[0].value}`
          )
    ),
  ])()
}

export default Home
