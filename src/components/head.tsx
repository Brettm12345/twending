import NextHead from 'next/head'
import React, { FC, LinkHTMLAttributes } from 'react'

import theme from 'data/theme'

const links: LinkHTMLAttributes<HTMLLinkElement>[] = [
  {
    href: '/apple-touch-icon.png',
    rel: 'apple-touch-icon',
    sizes: '180x180',
    type: 'image/png',
  },
  {
    href: '/favicon-32x32.png',
    rel: 'icon',
    sizes: '32x32',
    type: 'image/png',
  },
  {
    href: '/favicon-16x16.png',
    rel: 'icon',
    sizes: '16x16',
    type: 'image/png',
  },
  {
    href: '/manifest.json',
    rel: 'manifest',
  },
  {
    color: theme.colors.primary,
    href: '/safari-pinned-tab.svg',
    rel: 'mask-icon',
  },
]

const description =
  'Yet another GitHub trending application'
const name = 'Twending'

const meta = {
  description,
  'msapplication-TitleColor': theme.colors.primary,
  'theme-color': theme.colors.gray[300],
}

const Head: FC = () => (
  <NextHead>
    {links.map(props => (
      <link {...props} key={props.href} />
    ))}
    {Object.entries(meta).map(([name, content]) => (
      <meta content={content} key={name} name={name} />
    ))}
    <title>
      {name} - {description}
    </title>
  </NextHead>
)

export default Head
