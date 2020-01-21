import * as RD from '@devexperts/remote-data-ts'
import { map } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { Builder } from 'njsx'
import { ul, div } from 'njsx-react'

import Repo from './repo'

import Loading from 'components/loading'
import { Repo as RepoType } from 'data/github'
import { tw } from 'utils'

const loading = constant(Loading)

const Repos = RD.fold<any, RepoType[], Builder<any>>(
  loading,
  loading,
  flow(
    console.error,
    constant(div('failed to fetch repos'))
  ),
  flow(
    map(Repo),
    ul(
      tw(
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
    )
  )
)

export default Repos
