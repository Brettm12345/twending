import { Fragment } from "react";

import { RepositorySkeleton } from "@/components/repository-skeleton";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";

export default function Loader() {
  const totalItems = 20;
  return (
    <ItemGroup className="gap-0 *:data-[slot=item]:rounded-none *:data-[slot=item-separator]:my-0 [&>[data-slot=item]:first-child]:rounded-t-lg [&>[data-slot=item]:last-child]:rounded-b-lg">
      {Array.from({ length: totalItems }).map((_, index: number) => (
        /* biome-ignore lint/suspicious/noArrayIndexKey: index is used as a key */
        <Fragment key={`repository-skeleton-${index}`}>
          <RepositorySkeleton />
          {index !== totalItems - 1 && <ItemSeparator className="my-0" />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
