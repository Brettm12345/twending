import * as RD from '@devexperts/remote-data-ts'
import { constant, flow } from 'fp-ts/lib/function'
import * as L from 'list/curried'
import { Builder } from 'njsx'
import { div } from 'njsx-react'

import Repo from './repo'
import { list } from './repos.styles'

import Loading from 'src/components/loading'
import { Repo as RepoType } from 'src/data/github'

const loading = constant(Loading)

const Repos = RD.fold<
  Error,
  L.List<RepoType>,
  Builder<unknown>
>(
  loading,
  loading,
  flow(console.error, constant(div('Error fetching data'))),
  flow(L.map(Repo), L.toArray, list)
)

export default Repos
