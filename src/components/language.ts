import { pipe } from 'fp-ts/lib/pipeable'
import { span } from 'njsx-react'

import { tw, styled } from 'lib'
import { getColor } from 'src/data/languages'

const dot = pipe(
  tw(
    'inline-block',
    'mr-1',
    'border',
    'relative',
    'rounded-full',
    'border-gray-700'
  ),
  styled('span')`
    content: ' ';
    height: 2ex;
    line-height: 1.3;
    width: 2ex;
    bottom: -0.2ex;
  `
)

const Language = (language: string): typeof span =>
  span(
    tw('inline-flex', 'mr-4', 'font-medium', 'leading-5')
  )([
    dot({ style: { backgroundColor: getColor(language) } }),
    language,
  ])

export default Language
