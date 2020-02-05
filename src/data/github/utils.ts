/* eslint-disable @typescript-eslint/naming-convention */
import { Octokit } from '@octokit/rest'
import { prop } from 'fp-ts-ramda'
import { map } from 'fp-ts/lib/Array'
import { flow } from 'fp-ts/lib/function'

import { User, Repo } from './types'

type GithubRepo = Octokit.SearchReposResponseItemsItem
type GithubUser = Octokit.ActivityListReposStarredByUserResponseItemOwner
type GithubResponse = Octokit.Response<
  Octokit.SearchReposResponse
>

const handleUser: (u: GithubUser) => User = u => ({
  avatar: u.avatar_url,
  name: u.login,
  url: u.html_url,
})

const handleRepo: (r: GithubRepo) => Repo = ({
  description,
  language,
  owner,
  name,
  html_url: url,
  ...repo
}) => ({
  author: handleUser(owner as GithubUser),
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

export const handleResponse: (
  r: GithubResponse
) => Repo[] = flow(
  prop('data'),
  prop('items'),
  map(handleRepo)
)
