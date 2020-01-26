import dayjs from 'dayjs'
import { div, span, a, h3, p, li } from 'njsx-react'

import Avatar from './repo.avatar'
import Icons from './repo.icons'
import Language from './repo.language'

import { Repo as RepoType } from 'src/data/github'
import { tw } from 'src/utils'

const Repo = ({
  author,
  description,
  name,
  id,
  url,
  language,
  createdAt,
  ...info
}: RepoType) =>
  li({ key: id })(
    tw(
      'flex',
      'p-5',
      'sm:p-6',
      'md:p-8',
      'md:pb-5',
      'pb-4',
      'hover:bg-gray-900',
      'transition-bg',
      'border-b',
      'border-gray-900',
      'last:border-b-0'
    )
  )([
    Avatar(author),
    a(tw('flex', 'flex-col', 'flex-grow'))({
      href: url,
      rel: 'noopener noreferrer',
      target: '_blank',
    })([
      h3(tw('text-lg', 'text-white'))(
        `${author.name}/${name}`
      ),
      span(tw('text-xs', 'text-gray-400', 'mb-1'))(
        `Created on ${dayjs(createdAt).format(
          'MMMM D YYYY'
        )}`
      ),
      p(tw('max-w-3xl', 'mb-4', 'text-gray-300'))(
        description ?? 'No description provided'
      ),
      div(
        tw('flex', 'mt-auto', 'text-sm', 'text-gray-400')
      )([Language(language ?? 'Unknown'), Icons(info)]),
    ]),
  ])

export default Repo
