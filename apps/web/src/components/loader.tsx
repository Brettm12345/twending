import { Fragment } from "react";

import { RepositorySkeleton } from "@/components/repository-skeleton";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";

export default function Loader() {
  return (
    <ItemGroup>
      {Array.from({ length: 20 }).map((_, index: number) => (
        /* biome-ignore lint/suspicious/noArrayIndexKey: index is used as a key */
        <Fragment key={`repository-skeleton-${index}`}>
          <RepositorySkeleton />
          {index !== 9 && <ItemSeparator />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
