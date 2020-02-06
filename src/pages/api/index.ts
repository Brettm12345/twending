import { NowRequest, NowResponse } from '@now/node'
import { map } from 'fp-ts/lib/Array'
import * as Console from 'fp-ts/lib/Console'
import * as E from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import * as IO from 'fp-ts/lib/IO'
import { pipe } from 'fp-ts/lib/pipeable'

import { formatValidationError } from 'io-ts-reporters'
import fetchRepos from './_fetchRepos'
import { all } from 'src/data/constants'
import { Language } from 'src/data/languages/types'
import { Value as Period } from 'src/data/period/types'

export * from './_types'
export interface Query {
  period?: Period
  language?: Language
  page?: number
}

const handler = async (
  req: NowRequest,
  res: NowResponse
) => {
  const {
    period = 'month',
    language = all,
    page = 0,
  }: Query = req.query ?? {}

  const setHeader = (name: string) => (
    value: string | number | string[]
  ): IO.IO<void> => () => res.setHeader(name, value)

  const setCache = setHeader('Cache-Control')

  const handleError = flow(E.toError, error =>
    flow(Console.error(error), () =>
      res.status(500).end(error)
    )
  )

  const handleResponse: IO.IO<void> = pipe(
    await fetchRepos({ language, period })(page)(),
    E.fold(
      flow(map(formatValidationError), handleError),
      data =>
        flow(
          setCache(
            [
              'public',
              'max-age=0',
              's-maxage=31536000',
              'stale-while-revalidate',
              'immutable',
            ].join(',')
          ),
          setHeader('Content-Type')('application-json'),
          () => res.status(200).end(JSON.stringify(data))
        )
    )
  )

  return handleResponse()
}

export default handler
