import { avatar, link } from './repo.avatar.styles'

import { User } from 'api'

const Avatar = ({
  url: href,
  avatar: src,
}: User): typeof link => link({ href })(avatar({ src }))

export const Skeleton: typeof link = link(
  avatar({
    src:
      'https://avatars3.githubusercontent.com/u/17836748?v=4',
  })
)

export default Avatar
