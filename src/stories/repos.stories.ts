import * as RD from '@devexperts/remote-data-ts'
import { storiesOf } from '@storybook/react'

import { repos } from './data'

import Repos from 'src/components/repos'

storiesOf('Repo List', module)
  .add('Success', () => Repos(repos)())
  .add('Failure', () =>
    Repos(RD.failure(new Error('Test')))()
  )
  .add('Initial', () => Repos(RD.initial)())
  .add('Loading', () => Repos(RD.pending)())
