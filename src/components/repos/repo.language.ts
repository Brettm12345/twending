import { pipe } from 'fp-ts/lib/pipeable'
import njsx from 'njsx'
import { span } from 'njsx-react'
import styled from 'styled-components'

import { getColor } from 'src/data/languages'
import { tw } from 'src/utils'

const dot = pipe(
  styled.span.attrs(
    tw('inline-block', 'relative', 'mr-1', 'rounded-full')
  )`
    content: ' ';
    bottom: -0.15em;
    height: 1em;
    width: 1em;
  `,
  njsx
)

const Language = (language: string) =>
  span(
    tw(
      'inline-flex',
      'mr-4',
      'whitespace-no-wrap',
      'overflow-x-hidden',
      'ellipsis'
    )
  )([
    dot({ style: { backgroundColor: getColor(language) } }),
    language,
  ])

export default Language
