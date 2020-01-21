import { a, img } from 'njsx-react'
import { User } from 'data/github'
import { tw } from 'utils'

const Link = a(
  tw(
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
)

const Img = img(tw('rounded-lg'))({
  alt: 'Author avatar',
})

const Avatar = ({ url, avatar }: User) =>
  Link({ href: url })(
    Img({
      src: avatar,
    })
  )

export default Avatar
