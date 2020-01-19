import * as RD from '@devexperts/remote-data-ts'
import { map } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda'
import React, { FC } from 'react'

import Repo from './repo'

import Loading from 'components/loading'
import type { RemoteRepos } from 'data/github'
import { tw } from 'utils'

const List = tw('ul')(
  'w-11/12',
  'md:w-10/12',
  'mt-6',
  'overflow-hidden',
  'list-none',
  'bg-gray-800',
  'border',
  'border-gray-900',
  'rounded-lg',
  'shadow-xl'
)

const loading = constant(<Loading />)

const Repos: FC<Record<'repos', RemoteRepos>> = flow(
  prop('repos'),
  RD.fold(
    loading,
    loading,
    flow(
      console.error,
      constant(<div>Failed to fetch repos</div>)
    ),
    flow(
      map(({ id, ...repo }) => <Repo key={id} {...repo} />),
      items => <List>{items}</List>
    )
  )
)

export default Repos
