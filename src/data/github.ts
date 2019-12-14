import * as t from 'io-ts'
import { Repo, User } from 'types'

const GithubUser = t.type({
  login: t.string,
  avatar_url: t.string,
  html_url: t.string
});

type GithubUser = t.TypeOf<typeof GithubUser>;

export const GithubRepo = t.type({
  node_id: t.string,
  name: t.string,
  full_name: t.string,
  private: t.boolean,
  owner: GithubUser,
  html_url: t.string,
  description: t.union([t.string, t.null]),
  created_at: t.string,
  stargazers_count: t.number,
  language: t.union([t.string, t.null]),
  forks_count: t.number,
  open_issues_count: t.number
});

export type GithubRepo = t.TypeOf<typeof GithubRepo>;

export const GithubResponse = t.type({
  total_count: t.number,
  incomplete_results: t.boolean,
  items: t.array(GithubRepo)
});

export type GithubResponse = t.TypeOf<typeof GithubResponse>;

const transformUser = (user: GithubUser): User => ({
  avatar: user.avatar_url,
  name: user.login,
  url: user.html_url
});

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
  url: repo.html_url
});

export const transformResponse = (response: GithubResponse): Repo[] =>
  response.items.map(transformRepo);
