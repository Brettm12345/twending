import {
  SearchReposResponse as GithubResponse,
  SearchReposResponseItemsItem as GithubRepo,
  SearchReposResponseItemsItemOwner as GithubUser,
  Response,
} from '@octokit/rest'
import { prop } from 'fp-ts-ramda'
import { map } from 'fp-ts/lib/Array'
import { flow } from 'fp-ts/lib/function'

import { User, Repo } from './types'

const handleUser = (u: GithubUser): User => ({
  avatar: u.avatar_url,
  name: u.login,
  url: u.url,
})

const handleRepo = ({
  description,
  language,
  owner,
  name,
  ...repo
}: GithubRepo): Repo => ({
  author: handleUser(owner),
  createdAt: repo.created_at,
  description,
  forks: repo.forks_count,
  id: repo.node_id,
  issues: repo.open_issues_count,
  language,
  name,
  stars: repo.stargazers_count,
  url: repo.html_url,
})

type HandleResponse = (
  r: Response<GithubResponse>
) => Repo[]
export const handleResponse: HandleResponse = flow(
  prop('data'),
  prop('items'),
  map(handleRepo)
)
