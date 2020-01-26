import { pipe } from 'fp-ts/lib/pipeable'

import { avatar, link } from './repo.avatar.styles'

import { User } from 'src/data/github'

const Avatar = ({ url: href, avatar: src }: User) =>
  pipe(avatar({ src }), link({ href }))

export default Avatar
