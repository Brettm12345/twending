import { a, img } from 'njsx-react'

import { User } from 'src/data/github'
import { tw } from 'src/utils'

const Avatar = ({ url, avatar }: User) =>
  a({ href: url })(
    tw(
      'hidden',
      'xs:inline-block',
      'flex-shrink-0',
      'pt-1',
      'mr-4',
      'md:mr-8',
      'p-0',
      'w-16',
      'sm:w-20',
      'md:w-24'
    )
  )(
    img(tw('rounded-lg'))({
      alt: 'Author avatar',
      src: avatar,
    })
  )

export default Avatar
