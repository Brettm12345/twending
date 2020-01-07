/* eslint-disable @typescript-eslint/camelcase */
import * as t from 'io-ts'
import { Repo, User } from 'types'

const GithubUser = t.type({
  avatar_url: t.string,
  html_url: t.string,
  login: t.string,
})

type GithubUser = t.TypeOf<typeof GithubUser>

const nullable = (type: t.Mixed) => t.union([type, t.null])

export const GithubRepo = t.type({
  created_at: t.string,
  description: nullable(t.string),
  forks_count: t.number,
  full_name: t.string,
  html_url: t.string,
  language: nullable(t.string),
  name: t.string,
  node_id: t.string,
  open_issues_count: t.number,
  owner: GithubUser,
  private: t.boolean,
  stargazers_count: t.number,
})

export type GithubRepo = t.TypeOf<typeof GithubRepo>

export const GithubResponse = t.type({
  incomplete_results: t.boolean,
  items: t.array(GithubRepo),
  total_count: t.number,
})

export type GithubResponse = t.TypeOf<typeof GithubResponse>

const transformUser = (user: GithubUser): User => ({
  avatar: user.avatar_url,
  name: user.login,
  url: user.html_url,
})

export const transformRepo = ({
  description,
  language,
  owner,
  name,
  ...repo
}: GithubRepo): Repo => ({
  author: transformUser(owner),
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

export const transformResponse = (
  response: GithubResponse
): Repo[] => response.items.map(transformRepo)
