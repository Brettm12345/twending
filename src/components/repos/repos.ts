import * as RD from '@devexperts/remote-data-ts'
import { map } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { Errors } from 'io-ts'
import { Builder } from 'njsx'
import { div } from 'njsx-react'

import Repo from './repo'
import { list } from './repos.styles'

import Loading from 'src/components/loading'
import { Repo as RepoType } from 'src/pages/api'

const loading = constant(Loading)

const Repos = RD.fold<Errors, RepoType[], Builder<unknown>>(
  loading,
  loading,
  flow(console.error, constant(div('Error fetching data'))),
  flow(map(Repo), list)
)

export default Repos
