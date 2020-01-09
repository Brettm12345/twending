import { error } from 'fp-ts/lib/Console'
import { toError } from 'fp-ts/lib/Either'
import { constant, flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { Errors } from 'io-ts'
import React, { FC } from 'react'
import { cn } from 'ts-classnames'
import {
  RemoteData,
  fold,
} from '@devexperts/remote-data-ts'

import Loading from 'components/loading'
import RepoItem from './repo.item'
import { Repo } from 'types'

export interface RepoListProps {
  repos: RemoteData<Errors, Repo[]>
}

const loading = constant(<Loading />)

const failed = flow(
  toError,
  error,
  constant(<div>Failed to fetch repos</div>)
)

const success = (repos: Repo[]) => (
  <ul
    className={cn(
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
    )}
  >
    {repos.map(({ id, ...repo }) => (
      <RepoItem key={id} {...repo} />
    ))}
  </ul>
)

const RepoList: FC<RepoListProps> = ({ repos }) =>
  pipe(repos, fold(loading, loading, failed, success))

export default RepoList
