import 'intersection-observer'
import { NextPage } from 'next'
import { div } from 'njsx-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useRepos } from 'src/hooks'
import { tw } from 'lib'
import {
  AppBar,
  Head,
  Repos,
  Language,
  Period,
  ScrollToTop,
} from 'src/components'
import { app, heading } from 'src/styles'

const Home: NextPage = () => {
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
    div(tw('mt-6'))({ ref }),
  ])()
}

export default Home
