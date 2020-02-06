import { NowRequest, NowResponse } from '@now/node'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'

import fetchRepos from './_fetchRepos'
import { all } from 'src/data/constants'
import { Language } from 'src/data/languages/types'
import { Value as Period } from 'src/data/period/types'

interface Query {
  period?: Period
  language?: Language
  page?: number
}

const handler = (req: NowRequest, res: NowResponse) => {
  const {
    period = 'month',
    language = all,
    page = 0,
  }: Query = req.query

  pipe(
    fetchRepos({ language, period })(page),
    TE.fold<unknown, unknown, NowResponse>(
      flow(res.status(500).send, T.of),
      data => {
        res.setHeader(
          'Cache-Control',
          'max-age=0, s-maxage=31536000'
        )
        return T.of(res.status(200).send(data))
      }
    )
  )
  res.end()
}

export default handler
