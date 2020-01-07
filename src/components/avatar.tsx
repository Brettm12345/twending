import React, { FC } from 'react'
import { cn } from 'ts-classnames'

import { Repo } from 'types'

const Avatar: FC<Repo['author']> = ({ url, avatar }) => (
  <a
    className={cn(
      'flex-shrink-0',
      'w-1/6',
      'pt-1',
      'mr-4',
      'md:mr-8',
      'lg:w-1/12'
    )}
    href={url}
  >
    <img
      alt="Author avatar"
      className="rounded-lg"
      src={avatar}
    />
  </a>
)

export default Avatar
