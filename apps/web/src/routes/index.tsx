import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useCallback, useRef } from "react";

import { useLanguageValue } from "@/atoms/language";
import { usePeriodValue } from "@/atoms/period";
import { usePersonalAccessTokenValue } from "@/atoms/personal-access-token";
import { AppShell } from "@/components/app-shell";
import Loader from "@/components/loader";
import { Repository } from "@/components/repository";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const trpc = useTRPC();
  const period = usePeriodValue();
  const language = useLanguageValue();
  const personalAccessToken = usePersonalAccessTokenValue();
  const listRepositories = useInfiniteQuery(
    trpc.listRepositories.infiniteQueryOptions(
      {
        language: language,
        period: period,
        publicAccessToken: personalAccessToken ?? undefined,
      },
      {
        initialCursor: 1,
        staleTime: 60 * 60 * 1000,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    ),
  );
  const lastRepoRef = useRef<HTMLDivElement>(null);
  const handleIntersection = useCallback(
    (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && listRepositories.hasNextPage) {
        listRepositories.fetchNextPage();
      }
    },
    [listRepositories],
  );

  useIntersectionObserver(
    lastRepoRef,
    {
      rootMargin: "1000px",
      threshold: 0,
    },
    handleIntersection,
  );

  return (
    <AppShell>
      <ItemGroup className="has-data-[size=sm]:gap-0!">
        {listRepositories.data?.pages.map((page, pageIndex) =>
          page.repositories.map((repository, index) => (
            <Fragment key={repository.id}>
              <Repository
                repository={repository}
                ref={
                  pageIndex === listRepositories.data?.pages.length - 1 &&
                  index === page.repositories.length - 1
                    ? lastRepoRef
                    : undefined
                }
              />
              <ItemSeparator className="my-0" />
            </Fragment>
          )),
        )}
      </ItemGroup>
      {listRepositories.isFetching && <Loader />}
    </AppShell>
  );
}
