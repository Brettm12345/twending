import dayjs from 'dayjs'
import memoize from 'fast-memoize'

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

export const RepoSkeleton = memoize(() =>
  repo([
    AvatarSkeleton(),
    link([
      title(Skeleton({ height: '0.7em', width: '30%' })),
      date(Skeleton({ height: '0.2em', width: '15%' })),
      Description(
        [
          { height: '0.3em', width: '40%' },
          { height: '0.3em', width: '20%' },
        ].map(flow(Skeleton, div))
      ),
      Info(Skeleton({ height: '0.4em', width: '20%' })),
    ]),
  ])
)

export default memoize(Repo)
