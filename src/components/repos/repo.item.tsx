import { cn } from 'ts-classnames'
import React, { FC } from 'react'

import Avatar from './repo.avatar'
import Language from './repo.language'
import Icon, { IconName } from './repo.icon'

import { Repo as RepoType } from 'types'

interface RepoProps extends Omit<RepoType, 'id'> {
  isLast: boolean
}

const RepoItem: FC<RepoProps> = ({
  author,
  description = 'No description given',
  forks,
  issues,
  language,
  isLast,
  name,
  stars,
  url,
}) => (
  <li
    className={cn(
      'flex',
      'p-6',
      'pb-4',
      'md:p-8',
      'hover:bg-gray-900',
      'transition-bg'
    )}
  >
    <Avatar {...author} />
    <a
      className={cn('flex', 'flex-col', 'flex-grow')}
      href={url}
    >
      <h3 className={cn('mb-1', 'text-lg', 'text-white')}>
        {author.name}/{name}
      </h3>
      <p
        className={cn('max-w-3xl', 'mb-4', 'text-gray-300')}
      >
        {description || 'No description provided'}
      </p>
      <div
        className={cn(
          'flex',
          'mt-auto',
          'text-sm',
          'text-gray-400'
        )}
      >
        <Language>{language || 'Unknown'}</Language>
        {Object.entries({ forks, issues, stars }).map(
          ([key, value]) => (
            <span
              className={cn('inline-flex', 'mr-4')}
              key={key}
            >
              <Icon name={key as IconName} /> &nbsp;{value}
            </span>
          )
        )}
      </div>
    </a>
    {!isLast && <hr className={cn('border-gray-900')} />}
  </li>
)

export default RepoItem
