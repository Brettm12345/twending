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
        "flex-nowrap rounded-none border not-last:border-b-border px-4 pt-2 pb-4 first-of-type:rounded-t-lg last-of-type:rounded-b-lg",
        className,
      )}
      size="sm"
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
      className={cn("max-w-[calc(100svw-7rem)] truncate", className)}
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
      className={cn("line-clamp-2 max-w-[calc(100svw-7rem)]", className)}
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
        "flex items-center gap-1 font-normal text-muted-foreground text-sm [&>svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}
