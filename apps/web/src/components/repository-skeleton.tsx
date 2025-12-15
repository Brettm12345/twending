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
import { cn } from "@/lib/utils";

export function RepositorySkeleton({
  className,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <Item className={cn("p-4", className)} {...props}>
      <ItemMedia variant="image">
        <Skeleton className="size-10 rounded-sm object-cover" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Skeleton className="w-24 h-4" />
        </ItemTitle>
        <ItemDescription>
          <Skeleton className="w-1/5 h-2" />
          <Skeleton className="w-4/5 h-2" />
        </ItemDescription>
      </ItemContent>
      <ItemFooter className="justify-start *:data-[slot=skeleton]:h-4">
        <Skeleton className="w-24" />
        <Skeleton className="w-16" />
        <Skeleton className="w-16" />
      </ItemFooter>
    </Item>
  );
}
