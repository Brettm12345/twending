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
      className="rounded-none border not-last:border-b-border p-4 first-of-type:rounded-t-lg last-of-type:rounded-b-lg"
      size="sm"
      {...props}
    >
      <ItemMedia variant="image">
        <Skeleton className="size-full rounded-sm" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="mb-0.5">
          <Skeleton className="h-4 w-24" />
        </ItemTitle>
        <ItemDescription className="flex flex-col gap-2">
          <Skeleton className="h-4 w-1/5" />
          <Skeleton className="h-4 w-3/5" />
        </ItemDescription>
        <ItemFooter className="mt-2 flex flex-wrap justify-start">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </ItemFooter>
      </ItemContent>
    </Item>
  );
}
