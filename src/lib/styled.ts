import { flow } from 'fp-ts/lib/function'
import njsx from 'njsx'
import { ComponentType } from 'react'
import SC from 'styled-components'

export const styled = <
  C extends
    | keyof JSX.IntrinsicElements
    | ComponentType<unknown>
>(
  component: C
) => flow(SC(component), njsx)
