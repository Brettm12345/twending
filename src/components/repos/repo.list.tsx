import { toError } from 'fp-ts/lib/Either'
import { map } from 'fp-ts/lib/Array'
import {
  constant as c,
  flow as f,
} from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda'
import React, { FC } from 'react'
import {
  RemoteData,
  fold,
} from '@devexperts/remote-data-ts'

import Item from './repo.item'

import Loading from 'components/loading'
import { tw } from 'utils'

type Errors = import('io-ts').Errors
type Repo = import('data/github').Repo

const List = tw('ul')(
  'sm:w-11/12',
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
export interface RepoListProps {
  repos: RemoteData<Errors, Repo[]>
}

const handleError = f(
  JSON.stringify,
  toError,
  console.error
)
const error = c(<div>Failed to fetch repos</div>)
const loading = c(<Loading />)

const RepoList: FC<RepoListProps> = f(
  prop('repos'),
  fold(
    loading,
    loading,
    f(handleError, error),
    f(
      map(({ id, ...repo }) => <Item key={id} {...repo} />),
      c => <List>{c}</List>
    )
  )
)

export default RepoList
