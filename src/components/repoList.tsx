import RepoItem from 'components/repo'
import { flow } from 'fp-ts/lib/function'
import { Errors } from 'io-ts'
import { prop } from 'ramda'
import React, { memo } from 'react'
import { Repo } from 'types'

import {
  RemoteData,
  fold
} from '@devexperts/remote-data-ts'

export interface RepoListProps {
  repos: RemoteData<Errors, Repo[]>;
}

const RepoList: React.FC<RepoListProps> = flow(
  prop("repos"),
  fold(
    () => <div>Init</div>,
    () => <div>Loading...</div>,
    err => {
      console.error(err);
      return <div>Failed to fetch repos</div>;
    },
    repos => (
      <ul className="w-11/12 mt-6 overflow-hidden list-none bg-gray-800 border-gray-900 rounded-lg shadow-xl md:w-10/12">
        {repos.map(({ id, ...repo }, index) => (
          <RepoItem key={id} isLast={index === repos.length - 1} {...repo} />
        ))}
      </ul>
    )
  )
);

export default memo(RepoList);
