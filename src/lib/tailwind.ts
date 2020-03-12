import { flow } from 'fp-ts/lib/function'
import { cn } from 'ts-classnames'

export const tw = flow(cn, className => ({ className }))
