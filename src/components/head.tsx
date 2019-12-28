import NextHead from 'next/head'
import { FC } from 'react'
import theme from 'theme'

const Head: FC = () => (
  <NextHead>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <link
      rel="mask-icon"
      href="/safari-pinned-tab.svg"
      color={theme.colors.primary}
    />
    <meta name="msapplication-TileColor" content={theme.colors.primary} />
    <meta name="theme-color" content={theme.colors.gray[300]} />
    <title>Twending - Yet another GitHub trending application</title>
  </NextHead>
);

export default Head;
