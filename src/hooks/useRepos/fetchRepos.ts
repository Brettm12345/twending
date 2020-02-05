import * as RD from '@devexperts/remote-data-ts'
import { Octokit } from '@octokit/rest'
import dayjs from 'dayjs'
import { map } from 'fp-ts/lib/Array'
import { fold, toError } from 'fp-ts/lib/Either'
import { constant, flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { TaskEither } from 'fp-ts/lib/TaskEither'

import { RepoTask, handleResponse } from 'src/data/github'
import { SpecificLanguage } from 'src/data/languages'
import { Value as Period } from 'src/data/period'
import { join } from 'src/utils'

const octokit = new Octokit()

const gh = (
  q: string
): TaskEither<
  Error,
  Octokit.Response<Octokit.SearchReposResponse>
> =>
  TE.tryCatch(
    () =>
      octokit.search.repos({
        order: 'desc',
        q,
        sort: 'stars',
      }),
    toError
  )

const param = (k: string) => (v: string): string =>
  pipe([k, v], join(':'))

const getLanguage = flow(
  SpecificLanguage.decode,
  fold(constant(''), (str: string) =>
    pipe(str.replace('#', 'sharp'), param('language'))
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

const fetchRepos: QueryFN<RepoTask> = options =>
  flow(
    buildQuery(options),
    gh,
    TE.map(handleResponse),
    T.map(RD.fromEither)
  )

export default fetchRepos
