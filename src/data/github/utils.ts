/* eslint-disable @typescript-eslint/naming-convention */
import { Octokit } from '@octokit/rest'
import { prop } from 'fp-ts-ramda'
import { map } from 'fp-ts/lib/Array'
import { flow } from 'fp-ts/lib/function'

import { User, Repo } from './types'

const handleUser = (
  u: Octokit.SearchReposResponseItemsItemOwner
): User => ({
  avatar: u.avatar_url,
  name: u.login,
  url: u.url,
})

const handleRepo = ({
  description,
  language,
  owner,
  name,
  html_url: url,
  ...repo
}: Octokit.SearchReposResponseItemsItem): Repo => ({
  author: handleUser({
    ...owner,
    url: url.replace(/\/.*$/, ''),
  }),
  createdAt: repo.created_at,
  description,
  forks: repo.forks_count,
  id: repo.node_id,
  issues: repo.open_issues_count,
  language,
  name,
  stars: repo.stargazers_count,
  url,
})

type HandleResponse = (
  r: Octokit.Response<Octokit.SearchReposResponse>
) => Repo[]
export const handleResponse: HandleResponse = flow(
  prop('data'),
  prop('items'),
  map(handleRepo)
)
