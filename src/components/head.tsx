import NextHead from 'next/head'
import * as R from 'fp-ts/lib/Record'
import { map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import React, { FC, LinkHTMLAttributes } from 'react'

import theme from 'data/theme'

const links: Array<LinkHTMLAttributes<HTMLLinkElement>> = [
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
  viewport: 'initial-scale=1.0, width=device-width',
}

const Head: FC = () => (
  <NextHead>
    {pipe(
      links,
      map(props => <link {...props} key={props.href} />)
    )}
    {pipe(
      R.toArray(meta),
      map(([name, content]) => (
        <meta content={content} key={name} name={name} />
      ))
    )}
    <title>
      {name} - {description}
    </title>
  </NextHead>
)

export default Head
