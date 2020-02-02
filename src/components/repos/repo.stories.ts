import { storiesOf } from '@storybook/react'
import Repo from './repo'

storiesOf('Repo', module).add('Base Repo', () =>
  Repo({
    author: {
      avatar:
        'https://avatars0.githubusercontent.com/u/5332484?v=4',
      name: 'andrewthad',
      url: 'https://api.github.com/users/andrewthad',
    },
    createdAt: '2020-01-06T16:28:02Z',
    description: 'Universal hashing for byte sequences',
    forks: 0,
    id: 'MDEwOlJlcG9zaXRvcnkyMzIxNDAzOTQ=',
    issues: 1,
    language: 'Haskell',
    name: 'bytehash',
    stars: 3,
    url: 'https://github.com/andrewthad/bytehash',
  })()
)
