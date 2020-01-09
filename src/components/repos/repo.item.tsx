import React, { FC } from 'react'
import { pipe as p } from 'fp-ts/lib/pipeable'

import Avatar from './repo.avatar'
import Language from './repo.language'
import Icon, { IconName } from './repo.icon'
import { map } from 'fp-ts/lib/Array'
import { tw } from 'utils'

type RepoItemProps = Omit<import('data/github').Repo, 'id'>

const Li = tw('li')(
  'flex',
  'sm:p-6',
  'p-8',
  'pb-4',
  'hover:bg-gray-900',
  'transition-bg',
  'border-b',
  'border-gray-900',
  'last:border-b-0'
)

const A = tw('a')('flex', 'flex-col', 'flex-grow')

const Title = tw('h3')('mb-1', 'text-lg', 'text-white')

const Description = tw('p')(
  'max-w-3xl',
  'mb-4',
  'text-gray-300'
)

const Info = tw('div')(
  'flex',
  'mt-auto',
  'text-sm',
  'text-gray-400'
)

const InfoItem = tw('span')('inline-flex', 'mr-4')

const RepoItem: FC<RepoItemProps> = ({
  author,
  description = 'No description given',
  forks,
  issues,
  language,
  name,
  stars,
  url,
}) => (
  <Li>
    <Avatar {...author} />
    <A href={url} rel="noopener noreferrer" target="_blank">
      <Title>
        {author.name}/{name}
      </Title>
      <Description>
        {description || 'No description provided'}
      </Description>
      <Info>
        <Language>{language || 'Unknown'}</Language>
        {p(
          { forks, issues, stars },
          Object.entries,
          map(([key, value]) => (
            <InfoItem key={key}>
              <Icon name={key as IconName} /> &nbsp;{value}
            </InfoItem>
          ))
        )}
      </Info>
    </A>
  </Li>
)

export default RepoItem
