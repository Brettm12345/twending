import { map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { toArray as entries } from 'fp-ts/lib/Record'
import NextHead from 'next/head'
import njsx from 'njsx'
import { meta, title } from 'njsx-react'
import { createElement, LinkHTMLAttributes } from 'react'

import { description, name } from 'src/data/constants'
import { colors } from 'src/styles/theme'

const head = njsx(NextHead)
const { blue, gray } = colors

const Head: typeof head = head([
  pipe(
    [
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
        href: '/site.webmanifest',
        rel: 'manifest',
      },
      {
        color: blue,
        href: '/safari-pinned-tab.svg',
        rel: 'mask-icon',
      },
      {
        href: 'https://rsms.me/inter/inter.css',
        rel: 'stylesheet',
      },
    ] as Array<LinkHTMLAttributes<HTMLLinkElement>>,
    map(p => createElement('link', p))
  ),
  pipe(
    entries({
      description,
      'msapplication-TitleColor': blue,
      'theme-color': gray[800],
      viewport: 'initial-scale=1.0, width=device-width',
    }),
    map(([name, content]: string[]): typeof meta =>
      meta({ content, name })
    )
  ),
  title(`${name} - ${description}`),
])

export default Head
