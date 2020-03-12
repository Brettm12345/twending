import * as RD from '@devexperts/remote-data-ts'
import { map, range } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { div } from 'njsx-react'

import Repo, { RepoSkeleton } from './repo'
import { list } from './repos.styles'

import { RemoteRepos } from 'api'

const loading: Lazy<typeof list> = pipe(
  range(0, 30),
  map(RepoSkeleton),
  list,
  constant
)

const Repos: (repos: RemoteRepos) => typeof list = RD.fold(
  loading,
  loading,
  flow(
    console.error,
    constant(list(div('Error fetching data')))
  ),
  flow(map(Repo), list)
)

export default Repos
