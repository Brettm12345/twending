import {useLanguageValue} from '@/atoms/language'
import {usePeriodValue} from '@/atoms/period'
import {usePersonalAccessTokenValue} from '@/atoms/personal-access-token'
import {LanguageSelect} from '@/components/language-select'
import {PeriodSelect} from '@/components/period-select'
import {Repository} from '@/components/repository'
import {RepositorySkeleton} from '@/components/repository-skeleton'
import {SettingsDropdown} from '@/components/settings-dropdown'
import {ItemGroup, ItemSeparator} from '@/components/ui/item'
import {useTRPC} from '@/utils/trpc'
import {useInfiniteQuery} from '@tanstack/react-query'
import {createFileRoute} from '@tanstack/react-router'
import {Github} from 'lucide-react'
import {useIntersectionObserver} from 'node_modules/@tanstack/react-router/dist/esm/utils'
import {Fragment, useRef} from 'react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const trpc = useTRPC()
  const period = usePeriodValue()
  const language = useLanguageValue()
  const personalAccessToken = usePersonalAccessTokenValue()
  const listRepositories = useInfiniteQuery(
    trpc.listRepositories.infiniteQueryOptions(
      {
        language: language,
        period: period,
        publicAccessToken: personalAccessToken ?? undefined,
      },
      {
        initialCursor: 1,
        getNextPageParam: lastPage => lastPage.nextCursor,
      }
    )
  )
  const lastRepoRef = useRef<HTMLDivElement>(null)
  useIntersectionObserver(
    lastRepoRef,
    entry => {
      if (entry?.isIntersecting && listRepositories.hasNextPage) {
        listRepositories.fetchNextPage()
      }
    },
    {
      rootMargin: '1000px',
    }
  )
  return (
    <div className="flex flex-col">
      <header className="h-16 bg-card shadow-sm border-b border-border flex items-center justify-between px-4">
        <a href="https://github.com/brettm12345/twending" target="_blank">
          <Github className="size-10" />
        </a>
        <div className="flex items-center gap-2">
          <LanguageSelect />
          <PeriodSelect />
          <SettingsDropdown />
        </div>
      </header>
      <h1 className="text-2xl font-bold text-center mt-16">
        Trending Repositories
      </h1>
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
                      : null
                  }
                />
                <ItemSeparator />
              </Fragment>
            ))
          )}
        </ItemGroup>
        {listRepositories.isFetching && (
          <ItemGroup>
            {Array.from({length: 20}).map((_, index, array) => (
              <Fragment key={index}>
                <RepositorySkeleton />
                {index !== array.length - 1 && <ItemSeparator />}
              </Fragment>
            ))}
          </ItemGroup>
        )}
      </div>
    </div>
  )
}
