import NextHead from 'next/head'
import njsx from 'njsx'
import * as R from 'fp-ts/lib/Record'
import { map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { meta, title } from 'njsx-react'
import React, { LinkHTMLAttributes } from 'react'

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
  {
    href:
      'https://fonts.googleapis.com/css?family=Work+Sans:400,500,600&display=swap',
    rel: 'stylesheet',
  },
  {
    href: 'https://api.github.com',
    rel: 'preconnect',
  },
]

const description =
  'Yet another GitHub trending application'
const name = 'Twending'

const metaData = {
  description,
  'msapplication-TitleColor': theme.colors.primary,
  'theme-color': theme.colors.gray[300],
  viewport: 'initial-scale=1.0, width=device-width',
}

const Head = njsx(NextHead)([
  pipe(
    links,
    map(props => <link {...props} key={props.href} />) // I gotta use jsx here because links can't have children
  ),
  pipe(
    R.toArray(metaData),
    map(([name, content]) =>
      meta({ content, key: name, name })
    )
  ),
  title(`${name} - ${description}`),
])

export default Head
