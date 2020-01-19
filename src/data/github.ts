/* eslint-disable @typescript-eslint/camelcase */
import { prop } from 'fp-ts-ramda'
import { map } from 'fp-ts/lib/Array'
import { flow } from 'fp-ts/lib/function'
import type { Task } from 'fp-ts/lib/Task'
import type { RemoteData } from '@devexperts/remote-data-ts'
import type {
  SearchReposResponse as GithubResponse,
  SearchReposResponseItemsItem as GithubRepo,
  SearchReposResponseItemsItemOwner as GithubUser,
  Response,
} from '@octokit/rest'

export interface User {
  avatar: string
  name: string
  url: string
}
type HandleUser = (u: GithubUser) => User
const handleUser: HandleUser = u => ({
  avatar: u.avatar_url,
  name: u.login,
  url: u.url,
})


export interface Repo {
  author: User
  createdAt: string
  description: string | null
  forks: number
  issues: number
  id: string
  language: string | null
  name: string
  stars: number
  url: string
}
type HandleRepo = (a: GithubRepo) => Repo
export const handleRepo: HandleRepo = ({
  description,
  language,
  owner,
  name,
  ...repo
}) => ({
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

export type RemoteRepos = RemoteData<Error, Repo[]>
export type RepoTask = Task<RemoteRepos>