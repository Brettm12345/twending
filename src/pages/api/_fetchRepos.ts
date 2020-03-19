import { get } from 'axios-fp-ts/lib/client'
import { HttpError } from 'axios-fp-ts/lib/error'
import { expected } from 'axios-fp-ts/lib/expected'
import { toTaskEither } from 'axios-fp-ts/lib/taskEither'
import dayjs from 'dayjs'
import memoize from 'fast-memoize'
import { map } from 'fp-ts/lib/Array'
import { fold } from 'fp-ts/lib/Either'
import { constant, flow } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as TE from 'fp-ts/lib/TaskEither'

import { join } from 'lib'
import {
  replace,
  SpecificLanguage,
} from 'src/data/languages'
import { Value as Period } from 'src/data/period'
import { cache } from './_cache'
import { GithubResponse, RepoTaskEither } from './_types'
import { handleResponse } from './_util'

const logError: Endomorphism<HttpError> = errors => {
  console.error(
    'Failed to decode github response',
    JSON.stringify(errors)
  )
  return errors
}

const baseUrl =
  'https://api.github.com/search/repositories?sort=stars&order=desc&q='

const gh = (q: string): RepoTaskEither =>
  pipe(
    cache.get(q),
    O.fold(
      () =>
        pipe(
          toTaskEither(
            get(baseUrl + q, expected(GithubResponse))
          ),
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

const buildQuery = memoize<QueryFN<string>>(
  ({ period, language }) => (page = 0) =>
    `${getLanguage(language)}+${getPage(period, page)}`
)

const fetchRepos: QueryFN<RepoTaskEither> = options =>
  flow(buildQuery(options), gh)

export default fetchRepos
