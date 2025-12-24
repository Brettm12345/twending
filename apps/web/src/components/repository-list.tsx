import type React from "react";
import { Fragment } from "react";
import type { ItemGroup } from "@/components/ui/item";

export function RepositoryList({
  className,
  ...props
}: React.ComponentProps<typeof ItemGroup>) {
  return (
    <ItemGroup
      className={cn(
        "gap-0 *:data-[slot=item]:rounded-none *:data-[slot=item-separator]:my-0 [&>[data-slot=item]:first-child]:rounded-t-lg [&>[data-slot=item]:last-child]:rounded-b-lg",
        className,
      )}
      {...props}
    />
  );
}
