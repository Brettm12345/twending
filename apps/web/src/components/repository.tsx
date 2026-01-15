import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@twending/api/routers/index";
import { EyeIcon, GitBranchIcon, StarIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { LanguageIndicator } from "@/components/language-indicator";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

type RouterOutput = inferRouterOutputs<AppRouter>;

interface RepositoryProps extends ComponentProps<typeof Item> {
  repository: RouterOutput["listRepositories"]["repositories"][number];
}

function getAvatarUrl(avatarUrl: string, scale: number = 1) {
  const githubUrl = avatarUrl.replace("https://", "").replace("?v=4", "");
  const searchParams = new URLSearchParams({
    url: githubUrl,
    w: (40 * scale).toString(),
    h: (40 * scale).toString(),
    output: "webp",
    maxage: "1w",
  });
  return `https://wsrv.nl/?${searchParams.toString()}`;
}

export function Repository({
  repository,
  className,
  ...props
}: RepositoryProps) {
  return (
    <Item
      size="sm"
      className={cn(
        "p-4 flex-nowrap rounded-none first-of-type:rounded-t-lg last-of-type:rounded-b-lg",
        className,
      )}
      render={
        <a href={repository.html_url} target="_blank">
          <ItemMedia variant="image">
            <img
              srcSet={`${getAvatarUrl(repository.owner?.avatar_url, 1)} 1x, ${getAvatarUrl(repository.owner?.avatar_url, 2)} 2x`}
              alt={repository.owner?.login}
              width={40}
              height={40}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{repository.name}</ItemTitle>
            <ItemDescription>
              {repository.description ?? "No description"}
            </ItemDescription>
            <ItemFooter className="justify-start [&>span]:text-sm [&>span]:font-normal [&>span]:text-muted-foreground [&>span]:inline-flex [&>span]:gap-1 [&>span>svg]:size-3 [&>span]:items-center">
              <span>
                <LanguageIndicator
                  className="size-3"
                  language={repository.language ?? "Unknown"}
                />
                {repository.language}
              </span>
              <span>
                <StarIcon />
                {repository.stargazers_count}
              </span>
              <span>
                <EyeIcon />
                {repository.watchers_count}
              </span>
              <span>
                <GitBranchIcon />
                {repository.forks}
              </span>
            </ItemFooter>
          </ItemContent>
        </a>
      }
      {...props}
    ></Item>
  );
}
