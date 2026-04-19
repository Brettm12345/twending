import type { ComponentProps } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { ItemMedia } from "./item";

export function Repository({
  className,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn(
        "p-4 flex-nowrap rounded-none first-of-type:rounded-t-lg last-of-type:rounded-b-lg not-last:border-b-border border",
        className,
      )}
      {...props}
    />
  );
}

export function RepositoryMedia(props: ComponentProps<typeof ItemMedia>) {
  return <ItemMedia variant="image" {...props} />;
}

export function RepositoryContent(props: ComponentProps<typeof ItemContent>) {
  return <ItemContent {...props} />;
}

export function RepositoryTitle({
  className,
  ...props
}: ComponentProps<typeof ItemTitle>) {
  return (
    <ItemTitle
      className={cn("truncate max-w-[calc(100svw-6.5rem)]", className)}
      {...props}
    />
  );
}

export function RepositoryDescription({
  className,
  ...props
}: ComponentProps<typeof ItemDescription>) {
  return (
    <ItemDescription
      className={cn("line-clamp-2 max-w-[calc(100svw-6.5rem)]", className)}
      {...props}
    />
  );
}

export function RepositoryFooter({
  className,
  ...props
}: ComponentProps<typeof ItemFooter>) {
  return (
    <ItemFooter
      className={cn("justify-start [&>span]:text-sm", className)}
      {...props}
    />
  );
}

export function RepositoryFooterItem({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-sm font-normal text-muted-foreground flex gap-1 [&>svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}
