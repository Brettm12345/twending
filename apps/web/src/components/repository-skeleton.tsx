import type { ComponentProps } from "react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

export function RepositorySkeleton({
  className,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <Item
      size="sm"
      className="p-4 first-of-type:rounded-t-lg last-of-type:rounded-b-lg"
      {...props}
    >
      <ItemMedia variant="image">
        <Skeleton className="size-full rounded-sm" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Skeleton className="w-24 h-4" />
        </ItemTitle>
        <ItemDescription className="flex flex-col gap-1">
          <Skeleton className="w-1/5 h-2" />
          <Skeleton className="w-4/5 h-2" />
        </ItemDescription>
      </ItemContent>
      <ItemFooter className="justify-start">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-16 h-4" />
      </ItemFooter>
    </Item>
  );
}
