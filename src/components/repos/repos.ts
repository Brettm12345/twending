import * as RD from '@devexperts/remote-data-ts'
import { map } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { Builder } from 'njsx'
import { div } from 'njsx-react'

import Repo from './repo'
import { list } from './repos.styles'

import Loading from 'src/components/loading'
import { Repo as RepoType } from 'src/data/github'

const loading = constant(Loading)

const Repos = RD.fold<Error, RepoType[], Builder<unknown>>(
  loading,
  loading,
  flow(
    console.error,
    constant(div('failed to fetch repos'))
  ),
  flow(map(Repo), list)
)

export default Repos
