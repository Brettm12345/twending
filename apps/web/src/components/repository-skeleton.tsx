import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import {Skeleton} from '@/components/ui/skeleton'
import {cn} from '@/lib/utils'
import type {ComponentProps} from 'react'

export function RepositorySkeleton({
  className,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <Item className={cn('py-8 px-6', className)} {...props}>
      <ItemMedia variant="image">
        <Skeleton className="size-10 rounded-sm object-cover" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Skeleton className="w-24 h-4" />
        </ItemTitle>
        <ItemDescription>
          <Skeleton className="w-full h-4" />
        </ItemDescription>
      </ItemContent>
      <ItemFooter className="justify-start [&>div]:h-4">
        <Skeleton className="w-24" />
        <Skeleton className="w-16" />
        <Skeleton className="w-16" />
      </ItemFooter>
    </Item>
  )
}
