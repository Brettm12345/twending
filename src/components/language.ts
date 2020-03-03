import { pipe } from 'fp-ts/lib/pipeable'
import njsx from 'njsx'
import { span } from 'njsx-react'
import styled from 'styled-components'
import { getColor } from 'src/data/languages'
import { tw } from 'src/utils'

const dot = pipe(
  styled.span.attrs(
    tw(
      'inline-block',
      'mr-1',
      'border',
      'relative',
      'rounded-full',
      'border-gray-700'
    )
  )`
    content: ' ';
    height: 2ex;
    line-height: 1.3;
    width: 2ex;
    bottom: -0.2ex;
  `,
  njsx
)

const Language = (language: string) =>
  span(
    tw(
      'inline-flex',
      'mr-4',
      'ellipsis',
      'font-medium',
      'leading-5'
    )
  )([
    dot({ style: { backgroundColor: getColor(language) } }),
    language,
  ])

export default Language
