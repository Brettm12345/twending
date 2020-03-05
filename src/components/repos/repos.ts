import * as RD from '@devexperts/remote-data-ts'
import { map, range } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { Errors } from 'io-ts'
import { Builder } from 'njsx'
import { div } from 'njsx-react'

import Repo, { RepoSkeleton } from './repo'
import { list } from './repos.styles'

import { Repo as RepoType } from 'api'

const loading = () =>
  pipe(range(0, 30), map(RepoSkeleton), list)

const Repos = RD.fold<Errors, RepoType[], Builder<unknown>>(
  loading,
  loading,
  flow(console.error, constant(div('Error fetching data'))),
  flow(map(Repo), list)
)

export default Repos
