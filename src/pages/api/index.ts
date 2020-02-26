import { NowRequest, NowResponse } from '@now/node'
import { map } from 'fp-ts/lib/Array'
import * as Console from 'fp-ts/lib/Console'
import * as E from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { chain } from 'fp-ts/lib/IO'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'

import { ValidationError } from 'io-ts'
import { formatValidationError } from 'io-ts-reporters'
import { calculateMaxAge } from './_cache'
import fetchRepos from './_fetchRepos'
import { Repo } from './_types'
import { all } from 'src/data/constants'
import { Language } from 'src/data/languages/types'
import { Value as Period } from 'src/data/period/types'

export * from './_types'

export interface Query {
  period?: Period
  language?: Language
  page?: string
}

const handler = (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  const {
    period = 'month',
    language = all,
    page = '0',
  }: Query = req.query ?? {}

  const end = <A>(
    status: number,
    data: A
  ): IO<void> => () => res.status(status).end(data)

  const handleErr: (
    errors: ValidationError[]
  ) => IO<void> = flow(
    map(formatValidationError),
    E.toError,
    err =>
      pipe(
        Console.error(err),
        chain(() => end(500, err))
      )
  )

  const setHeader = (
    ...a: Parameters<typeof res.setHeader>
  ): IO<void> => () => res.setHeader(...a)

  const handleRes = (data: Repo[]): IO<void> =>
    pipe(
      setHeader(
        'Cache-Control',
        [
          'public',
          'max-age=0',
          `s-maxage=${calculateMaxAge(period)}`,
          'immutable',
        ].join(',')
      ),
      chain(() =>
        setHeader('Content-Type', 'application-json')
      ),
      chain(() => end(200, JSON.stringify(data)))
    )

  return pipe(
    fetchRepos({ language, period })(+page),
    T.chainIOK(E.fold(handleErr, handleRes))
  )()
}

export default handler
