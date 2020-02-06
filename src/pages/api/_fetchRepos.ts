import { Octokit } from '@octokit/rest'
import dayjs from 'dayjs'
import { map } from 'fp-ts/lib/Array'
import { fold } from 'fp-ts/lib/Either'
import { constant, flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { Errors } from 'io-ts'

import { formatValidationError } from 'io-ts-reporters'
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

const gh = (q: string): TaskEither<Errors, Repo[]> =>
  pipe(
    () =>
      octokit.search.repos({
        order: 'desc',
        q,
        sort: 'stars',
      }),
    T.map(({ data }) => GithubResponse.decode(data)),
    TE.mapLeft(errors => {
      console.error(
        'Failed to decode github response',
        errors.map(formatValidationError)
      )
      return errors
    }),
    TE.map(handleResponse)
  )

const param = (k: string) => (v: string): string =>
  pipe([k, v], join(':'))

const getLanguage = flow(
  SpecificLanguage.decode,
  fold(
    constant(''),
    flow(
      replace('#', 'sharp'),
      replace('+', '%2B'),
      param('language')
    )
  )
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

const buildQuery: QueryFN<string> = ({
  period,
  language,
}) => (page = 0) =>
  pipe(
    [getLanguage(language), getPage(period, page)],
    join('+')
  )

const fetchRepos: QueryFN<TaskEither<
  Errors,
  Repo[]
>> = options => flow(buildQuery(options), gh)

export default fetchRepos
