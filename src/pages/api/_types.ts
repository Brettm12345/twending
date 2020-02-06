/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/naming-convention */
import { RemoteData } from '@devexperts/remote-data-ts'
import { Task } from 'fp-ts/lib/Task'
import * as t from 'io-ts'
import { Errors, TypeOf } from 'io-ts'

export const GithubUser = t.type({
  /** Link to the users avatar */
  avatar_url: t.string,
  /** Link to the users profile */
  html_url: t.string,
  /** Username */
  login: t.string,
})
export type GithubUser = TypeOf<typeof GithubUser>

const GithubRepo = t.type({
  /** The date the repo was created */
  created_at: t.string,
  description: t.union([t.null, t.string]),
  /** The number of forks a repository has */
  forks_count: t.number,
  html_url: t.string,
  language: t.union([t.null, t.string]),
  name: t.string,
  node_id: t.string,
  open_issues_count: t.number,
  owner: GithubUser,
  /** The number of stars a repository has */
  stargazers_count: t.number,
  url: t.string,
})
export type GithubRepo = TypeOf<typeof GithubRepo>

export const GithubResponse = t.type({
  incomplete_results: t.boolean,
  items: t.array(GithubRepo),
  total_count: t.number,
})
export type GithubResponse = TypeOf<typeof GithubResponse>

export const User = t.type({
  avatar: t.string,
  name: t.string,
  url: t.string,
})
export type User = TypeOf<typeof User>

export const Repo = t.type({
  author: User,
  createdAt: t.string,
  description: t.union([t.string, t.null]),
  forks: t.number,
  id: t.string,
  issues: t.number,
  language: t.union([t.string, t.null]),
  name: t.string,
  stars: t.number,
  url: t.string,
})
export type Repo = TypeOf<typeof Repo>
export type RemoteRepos = RemoteData<Errors, Repo[]>
export type RepoTask = Task<RemoteRepos>

export const ApiResponse = t.array(Repo)
export type ApiResponse = TypeOf<typeof ApiResponse>
