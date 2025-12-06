import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { Fragment, useRef } from "react";
import { useLanguageValue } from "@/atoms/language";
import { usePeriodValue } from "@/atoms/period";
import { usePersonalAccessTokenValue } from "@/atoms/personal-access-token";
import { LanguageSelect } from "@/components/language-select";
import { PeriodSelect } from "@/components/period-select";
import { Repository } from "@/components/repository";
import { RepositorySkeleton } from "@/components/repository-skeleton";
import { SettingsDropdown } from "@/components/settings-dropdown";
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
				getNextPageParam: (lastPage) => lastPage.nextCursor,
			},
		),
	);
	const lastRepoRef = useRef<HTMLDivElement>(null);
	useIntersectionObserver(
		lastRepoRef as React.RefObject<HTMLDivElement>,
		{
			rootMargin: "1000px",
			threshold: 0,
		},
		(entry: IntersectionObserverEntry | null) => {
			if (entry?.isIntersecting && listRepositories.hasNextPage) {
				listRepositories.fetchNextPage();
			}
		},
	);
	return (
		<div className="flex flex-col">
			<header className="h-16 bg-accent shadow-sm border-b border-border flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-10">
				<a
					href="https://github.com/brettm12345/twending"
					target="_blank"
					rel="noopener"
				>
					<Github className="size-10" />
				</a>
				<div className="flex items-center gap-2">
					<LanguageSelect />
					<PeriodSelect />
					<SettingsDropdown />
				</div>
			</header>
			<h1 className="text-2xl font-bold text-center mt-32">
				Trending Repositories
			</h1>
			<div className="flex p-2 flex-1">
				<div className="container mx-auto rounded-2xl bg-card mt-16 mb-4 border border-border">
					<ItemGroup>
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
									<ItemSeparator />
								</Fragment>
							)),
						)}
					</ItemGroup>
					{listRepositories.isFetching && (
						<ItemGroup>
							{Array.from({ length: 20 }).map((_, index, array) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: we need to use the index as a key
								<Fragment key={`skeleton-${index}`}>
									<RepositorySkeleton />
									{index !== array.length - 1 && <ItemSeparator />}
								</Fragment>
							))}
						</ItemGroup>
					)}
				</div>
			</div>
		</div>
	);
}
