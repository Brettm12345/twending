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
      data-slot="repository"
      className={cn(
        "group/repository flex-nowrap rounded-none border not-last:border-b-border px-4 pt-3 pb-4 first-of-type:rounded-t-lg last-of-type:rounded-b-lg",
        className,
      )}
      size="sm"
      {...props}
    />
  );
}

export function RepositoryMedia(props: ComponentProps<typeof ItemMedia>) {
  return <ItemMedia data-slot="repository-media" variant="image" {...props} />;
}

export function RepositoryContent(props: ComponentProps<typeof ItemContent>) {
  return <ItemContent data-slot="repository-content" {...props} />;
}

export function RepositoryTitle({
  className,
  ...props
}: ComponentProps<typeof ItemTitle>) {
  return (
    <ItemTitle
      data-slot="repository-title"
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
      data-slot="repository-description"
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
      data-slot="repository-footer"
      className={cn("mt-2 flex flex-wrap justify-start", className)}
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
      data-slot="repository-footer-item"
      className={cn(
        "flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-normal text-muted-foreground text-xs group-hover/repository:bg-input/50 [&>svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}
