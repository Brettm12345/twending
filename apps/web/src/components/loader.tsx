import { Fragment } from "react";

import { RepositorySkeleton } from "@/components/repository-skeleton";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";

export default function Loader() {
  const totalItems = 20;
  return (
    <ItemGroup>
      {Array.from({ length: totalItems }).map((_, index: number) => (
        /* biome-ignore lint/suspicious/noArrayIndexKey: index is used as a key */
        <Fragment key={`repository-skeleton-${index}`}>
          <RepositorySkeleton />
          {index !== totalItems - 1 && <ItemSeparator />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
