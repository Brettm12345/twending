import * as RD from '@devexperts/remote-data-ts'
import memoize from 'fast-memoize'
import { map } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { Errors } from 'io-ts'
import { Builder } from 'njsx'
import { div } from 'njsx-react'

import Repo from './repo'
import { list } from './repos.styles'

import { Repo as RepoType } from 'api'
import Loading from 'src/components/loading'

const loading = constant(Loading)

const Repos = RD.fold<Errors, RepoType[], Builder<unknown>>(
  loading,
  loading,
  flow(console.error, constant(div('Error fetching data'))),
  flow(map(Repo), list)
)

export default memoize(Repos)
