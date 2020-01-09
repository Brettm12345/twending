/* eslint-disable @typescript-eslint/camelcase */
import * as t from 'io-ts'
import { flow as f } from 'fp-ts/lib/function'
import { map } from 'fp-ts/lib/Array'
import { prop } from 'fp-ts-ramda'

import { nullable } from 'utils'

export interface User {
  avatar: string
  name: string
  url: string
}

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

const GithubUser = t.type({
  avatar_url: t.string,
  html_url: t.string,
  login: t.string,
})

type GithubUser = t.TypeOf<typeof GithubUser>

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

type TransformUser = (u: GithubUser) => User
const transformUser: TransformUser = u => ({
  avatar: u.avatar_url,
  name: u.login,
  url: u.html_url,
})

type TransformRepo = (a: GithubRepo) => Repo
export const transformRepo: TransformRepo = ({
  description,
  language,
  owner,
  name,
  ...repo
}) => ({
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

type TransformResponse = (r: GithubResponse) => Repo[]
export const transformResponse: TransformResponse = f(
  prop('items'),
  map(transformRepo)
)
