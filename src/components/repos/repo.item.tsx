import { cn } from 'ts-classnames'
import React, { FC } from 'react'

import Avatar from './repo.avatar'
import Language from './repo.language'
import Icon, { IconName } from './repo.icon'

import { Repo as RepoType } from 'types'

const RepoItem: FC<Omit<RepoType, 'id'>> = ({
  author,
  description = 'No description given',
  forks,
  issues,
  language,
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
      'transition-bg',
      'border-b',
      'border-gray-900',
      'last:border-b-0'
    )}
  >
    <Avatar {...author} />
    <a
      className={cn('flex', 'flex-col', 'flex-grow')}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
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
  </li>
)

export default RepoItem
