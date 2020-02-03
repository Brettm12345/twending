/* eslint-disable @typescript-eslint/naming-convention */
import Octokit, {
  SearchReposResponse as GithubResponse,
  SearchReposResponseItemsItem as GithubRepo,
  SearchReposResponseItemsItemOwner as GithubUser,
  Response,
} from '@octokit/rest'
import { toError } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as TE from 'fp-ts/lib/TaskEither'
import { List } from 'list/curried'
import * as L from 'list/curried'
import * as O from 'optics-ts'

import { User, Repo } from './types'

import { join } from 'src/utils'

const split = (separator = ' ') => (
  str: string
): List<string> => pipe(str.split(separator), L.from)

const getAuthorUrl = flow(split('/'), (xs: List<string>) =>
  pipe(L.dropLast(1)(xs), join('/'))
)

const handleUser = (u: GithubUser, url: string): User => ({
  avatar: u.avatar_url,
  name: u.login,
  url: getAuthorUrl(url),
})

const handleRepo = ({
  owner,
  description,
  language,
  name,
  html_url: url,
  ...r
}: GithubRepo): Repo => ({
  author: handleUser(owner, url),
  createdAt: r.created_at,
  description,
  forks: r.forks_count,
  id: r.node_id,
  issues: r.open_issues_count,
  language,
  name,
  stars: r.stargazers_count,
  url,
})

const response = O.optic<Response<GithubResponse>>()
const items = response.path(['data', 'items'])
export const handleResponse = flow(
  O.get(items),
  L.from,
  L.map(handleRepo)
)

const octokit = new Octokit()

export const query = (q: string) =>
  TE.tryCatch<Error, Response<GithubResponse>>(
    () =>
      octokit.search.repos({
        order: 'desc',
        q,
        sort: 'stars',
      }),
    toError
  )
