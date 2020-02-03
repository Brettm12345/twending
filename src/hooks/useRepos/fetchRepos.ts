import * as RD from '@devexperts/remote-data-ts'
import dayjs from 'dayjs'
import { fold } from 'fp-ts/lib/Either'
import { constant, flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { list, map } from 'list/curried'

import {
  RepoTask,
  handleResponse,
  query,
} from 'src/data/github'
import { SpecificLanguage } from 'src/data/languages'
import { Value as Period } from 'src/data/period'
import { join } from 'src/utils'

const param = (k: string) => (v: string) => `${k}:${v}`

const getLanguage = flow(
  SpecificLanguage.decode,
  fold(constant(''), param('language'))
)

const getPage = (period: Period, page: number): string =>
  pipe(
    list(page + 1, page),
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
  `${getLanguage(language)}+${getPage(period, page)}`

const fetchRepos: QueryFN<RepoTask> = options =>
  flow(
    buildQuery(options),
    query,
    TE.map(handleResponse),
    T.map(RD.fromEither)
  )

export default fetchRepos
