import * as RD from '@devexperts/remote-data-ts'
import { storiesOf } from '@storybook/react'

import { repos } from './data'
import Repos from 'src/components/repos'
import { badUrl } from 'axios-fp-ts/lib/error'

storiesOf('Repo List', module)
  .add('Success', () => Repos(repos)())
  .add('Failure', () =>
    Repos(RD.failure(badUrl('Error')))()
  )
  .add('Initial', () => Repos(RD.initial)())
  .add('Loading', () => Repos(RD.pending)())
