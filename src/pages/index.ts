import { div } from 'njsx-react'
import { FC, useEffect } from 'react'

import 'src/styles/global.css'

import { useInView } from 'react-intersection-observer'
import AppBar from 'src/components/appBar/appBar'
import Head from 'src/components/head'
import Repos from 'src/components/repos'
import ScrollToTop from 'src/components/scrollToTop'
import { Language, Period } from 'src/components/select'
import { useRepos } from 'src/hooks/useRepos'
import { app, heading, Button } from 'src/styles/home'
import { tw } from 'src/utils'

const Home: FC = () => {
  const {
    repos,
    loadNextPage,
    language,
    period,
  } = useRepos()
  const [ref, inView] = useInView({ threshold: 1 })
  useEffect(loadNextPage, [inView])
  return app([
    Head(),
    AppBar([Language(language), Period(period)]),
    heading('Trending Repositories'),
    Repos(repos),
    ScrollToTop(),
    div(tw('mt-6'))(
      Button({ onClick: loadNextPage, ref })(
        `Load next ${period[0].value}`
      )
    ),
  ])()
}

export default Home
