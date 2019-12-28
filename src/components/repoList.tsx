import RepoItem from 'components/repo'
import { error } from 'fp-ts/lib/Console'
import { toError } from 'fp-ts/lib/Either'
import { constant, flow } from 'fp-ts/lib/function'
import { Errors } from 'io-ts'
import { prop } from 'ramda'
import { FC } from 'react'
import { cn } from 'ts-classnames'
import { Repo } from 'types'

import {
  RemoteData,
  fold
} from '@devexperts/remote-data-ts'

import Loading from './loading'

export interface RepoListProps {
  repos: RemoteData<Errors, Repo[]>;
}

const loading = constant(<Loading />);

const failed = flow(
  toError,
  error,
  constant(<div>Failed to fetch repos</div>)
);

const render = (repos: Repo[]) => (
  <ul
    className={cn(
      "w-11/12",
      "mt-6",
      "overflow-hidden",
      "list-none",
      "bg-gray-800",
      "border-gray-900",
      "rounded-lg",
      "shadow-xl",
      "md:w-10/12"
    )}
  >
    {repos.map(({ id, ...repo }, index) => (
      <RepoItem key={id} isLast={index === repos.length - 1} {...repo} />
    ))}
  </ul>
);

const RepoList: FC<RepoListProps> = flow(
  prop("repos"),
  fold(loading, loading, failed, render)
);

export default RepoList;
