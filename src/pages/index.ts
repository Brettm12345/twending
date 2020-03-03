import { div } from 'njsx-react'
import { useEffect, FC } from 'react'
import { useInView } from 'react-intersection-observer'

import 'src/styles/global.css'

import { useRepos } from '../hooks'
import {
  AppBar,
  Head,
  Repos,
  Language,
  Period,
  ScrollToTop,
} from 'src/components'
import { app, heading, Button } from 'src/styles'
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
