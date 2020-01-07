import NextHead from 'next/head'
import React, { FC } from 'react'

import theme from 'data/theme'

const description =
  'Yet another GitHub trending application'
const name = 'Twending'

const Head: FC = () => (
  <NextHead>
    <link
      href="/apple-touch-icon.png"
      rel="apple-touch-icon"
      sizes="180x180"
    />
    <link
      href="/favicon-32x32.png"
      rel="icon"
      sizes="32x32"
      type="image/png"
    />
    <link
      href="/favicon-16x16.png"
      rel="icon"
      sizes="16x16"
      type="image/png"
    />
    <link href="/manifest.json" rel="manifest" />
    <link
      color={theme.colors.primary}
      href="/safari-pinned-tab.svg"
      rel="mask-icon"
    />
    <meta
      content={theme.colors.primary}
      name="msapplication-TileColor"
    />
    <meta
      content={theme.colors.gray[300]}
      name="theme-color"
    />
    <meta content={description} name="description" />
    <title>
      {name} - {description}
    </title>
  </NextHead>
)

export default Head
