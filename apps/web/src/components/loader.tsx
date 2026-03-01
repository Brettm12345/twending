import { RepositorySkeleton } from "@/components/repository-skeleton";
import { ItemGroup } from "@/components/ui/item";

export default function Loader() {
  const totalItems = 20;
  return (
    <ItemGroup className="has-data-[size=sm]:gap-0!">
      {Array.from({ length: totalItems }).map((_, index: number) => (
        /* biome-ignore lint/suspicious/noArrayIndexKey: index is used as a key */
        <RepositorySkeleton key={`repository-skeleton-${index}`} />
      ))}
    </ItemGroup>
  );
}
