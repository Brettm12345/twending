import React, { FC } from 'react'

import { User } from 'data/github'
import { tw } from 'utils'

const A = tw('a')(
  'hidden',
  'xs:inline-block',
  'flex-shrink-0',
  'pt-1',
  'mr-4',
  'md:mr-8',
  'w-16',
  'sm:w-20',
  'md:w-24'
)

const Img = tw('img')('rounded-lg')

const Avatar: FC<User> = ({ url, avatar }) => (
  <A href={url}>
    <Img alt="Author avatar" src={avatar} />
  </A>
)

export default Avatar
