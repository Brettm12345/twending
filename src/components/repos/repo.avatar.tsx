import React, { FC } from 'react'

import { User } from 'data/github'
import { tw } from 'utils'

const A = tw('a')(
  'mr-8',
  'md:w-1/12',
  'sm:w-20',
  'pt-1',
  'mr-4'
)

const Img = tw('img')('rounded-lg')

const Avatar: FC<User> = ({ url, avatar }) => (
  <A href={url}>
    <Img alt="Author avatar" src={avatar} />
  </A>
)

export default Avatar
