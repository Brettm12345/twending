import { map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { toArray as entries } from 'fp-ts/lib/Record'
import NextHead from 'next/head'
import njsx from 'njsx'
import { meta, title } from 'njsx-react'
import { createElement, LinkHTMLAttributes } from 'react'

import { name, description } from 'src/data/constants'
import theme from 'src/data/theme'

const {
  colors: { primary, gray },
} = theme

type LinkProps = LinkHTMLAttributes<HTMLLinkElement>
const links: LinkProps[] = [
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
    color: primary,
    href: '/safari-pinned-tab.svg',
    rel: 'mask-icon',
  },
  {
    href: 'https://api.github.com',
    rel: 'preconnect',
  },
]

const metaData = {
  description,
  'msapplication-TitleColor': primary,
  'theme-color': gray[300],
  viewport: 'initial-scale=1.0, width=device-width',
}

// I have to use createElement here because njsx doesn't work
const createLink = (props: LinkProps) =>
  createElement('link', props)

const createMeta = ([name, content]: [string, string]) =>
  meta({ content, name })

const Head = njsx(NextHead)([
  pipe(links, map(createLink)),
  pipe(entries(metaData), map(createMeta)),
  title(`${name} - ${description}`),
])

export default Head
