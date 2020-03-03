import { Octokit } from '@octokit/rest'
import { OctokitResponse } from '@octokit/types'
import dayjs from 'dayjs'
import memoize from 'fast-memoize'
import { map } from 'fp-ts/lib/Array'
import { fold } from 'fp-ts/lib/Either'
import { constant, flow } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { Errors } from 'io-ts'
import { formatValidationError } from 'io-ts-reporters'
import * as OP from 'optics-ts'

import { cache } from './_cache'
import { Repo, GithubResponse } from './_types'
import { handleResponse } from './_util'
import {
  SpecificLanguage,
  replace,
} from 'src/data/languages'
import { Value as Period } from 'src/data/period'
import { join } from 'src/utils'

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`,
})

const data = OP.optic<OctokitResponse<unknown>>().prop(
  'data'
)

const decode = flow(OP.get(data), GithubResponse.decode)

const search = (q: string) => () =>
  octokit.search.repos({ order: 'desc', q, sort: 'stars' })

const logError: Endomorphism<Errors> = errors => {
  console.error(
    'Failed to decode github response',
    errors.map(formatValidationError)
  )
  return errors
}
const gh = (q: string): TaskEither<Errors, Repo[]> =>
  pipe(
    cache.get(q),
    O.fold(
      () =>
        pipe(
          search(q),
          T.map(decode),
          TE.mapLeft(logError),
          TE.map(handleResponse),
          TE.chain(cache.set(q))
        ),
      TE.right
    )
  )

const param = (k: string): Endomorphism<string> => v =>
  `${k}:${v}`

const encode: Endomorphism<string> = flow(
  replace('#', 'sharp'),
  replace('+', '&2B')
)

const getLanguage = flow(
  SpecificLanguage.decode,
  fold(constant(''), flow(encode, param('language')))
)

const getPage = (period: Period, page: number): string =>
  pipe(
    [page + 1, page],
    map(value =>
      dayjs()
        .subtract(value, period)
        .format('YYYY-MM-DD')
    ),
    join('..'),
    param('created')
  )

type QueryFN<T> = (options: {
  period: Period
  language: string
}) => (page?: number) => T

const buildQuery: QueryFN<string> = memoize(
  ({ period, language }) => (page = 0) =>
    `${getLanguage(language)}+${getPage(period, page)}`
)

const fetchRepos: QueryFN<TaskEither<
  Errors,
  Repo[]
>> = options => flow(buildQuery(options), gh)

export default fetchRepos
