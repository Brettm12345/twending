import dayjs from 'dayjs'

import { flow } from 'fp-ts/lib/function'
import { div } from 'njsx-react'
import Avatar, {
  Skeleton as AvatarSkeleton,
} from './repo.avatar'
import Icons from './repo.icons'
import {
  repo,
  link,
  title,
  date,
  description as Description,
  info as Info,
} from './repo.styles'
import { Skeleton } from 'src/components'
import Language from 'src/components/language'
import { Repo as RepoType } from 'src/pages/api'

const Repo = ({
  author,
  description,
  name,
  id: key,
  url: href,
  language,
  createdAt,
  ...info
}: RepoType): typeof repo =>
  repo({ key })([
    Avatar(author),
    link({ href })([
      title(`${author.name}/${name}`),
      date(
        `Created on ${dayjs(createdAt).format(
          'MMMM D YYYY'
        )}`
      ),
      Description(description ?? 'No description provided'),
      Info([Language(language ?? 'Unknown'), Icons(info)]),
    ]),
  ])

export const RepoSkeleton = () =>
  repo({
    style: { lineHeight: 0.8 },
  })([
    AvatarSkeleton(),
    link([
      title({ style: { marginBottom: '-0.2rem' } })(
        Skeleton({ height: '0.5rem', width: '30%' })
      ),
      date({ style: { marginBottom: '0.5rem' } })(
        Skeleton({ height: '0.2rem', width: '15%' })
      ),
      [40, 20, 10].map(
        flow(
          width => ({
            height: '0.3rem',
            width: `${width}%`,
          }),
          Skeleton,
          div
        )
      ),
      Info(Skeleton({ height: '0.4rem', width: '20%' })),
    ]),
  ])

export default Repo
