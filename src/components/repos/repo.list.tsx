import { toError } from 'fp-ts/lib/Either'
import { map } from 'fp-ts/lib/Array'
import { constant, flow } from 'fp-ts/lib/function'
import { prop } from 'fp-ts-ramda'
import React, { FC } from 'react'
import {
  RemoteData,
  fold,
} from '@devexperts/remote-data-ts'

import Item from './repo.item'

import { Repo } from 'data/github'
import Loading from 'components/loading'
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
export interface RepoListProps {
  repos: RemoteData<Error, Repo[]>
}

const handleError = flow(
  JSON.stringify,
  toError,
  console.error
)
const error = constant(<div>Failed to fetch repos</div>)
const loading = constant(<Loading />)

const RepoList: FC<RepoListProps> = flow(
  prop('repos'),
  fold(
    loading,
    loading,
    flow(handleError, error),
    flow(
      map(({ id, ...repo }) => <Item key={id} {...repo} />),
      items => <List>{items}</List>
    )
  )
)

export default RepoList
