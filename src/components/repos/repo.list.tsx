import { toError } from 'fp-ts/lib/Either'
import { constant, flow as f } from 'fp-ts/lib/function'
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

const loading = constant(<Loading />)

const failed = f(
  JSON.stringify,
  toError,
  console.error,
  constant(<div>Failed to fetch repos</div>)
)

const success = (repos: Repo[]) => (
  <List>
    {repos.map(({ id, ...repo }) => (
      <Item key={id} {...repo} />
    ))}
  </List>
)

const RepoList: FC<RepoListProps> = f(
  prop('repos'),
  fold(loading, loading, failed, success)
)

export default RepoList
