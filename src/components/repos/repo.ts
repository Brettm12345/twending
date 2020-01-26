import dayjs from 'dayjs'

import Avatar from './repo.avatar'
import Icons from './repo.icons'
import Language from './repo.language'
import {
  repo,
  link,
  title,
  date,
  description as Description,
  info as Info,
} from './repo.styles'
import { Repo as RepoType } from 'src/data/github'

const Repo = ({
  author,
  description,
  name,
  id: key,
  url: href,
  language,
  createdAt,
  ...info
}: RepoType) =>
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

export default Repo
