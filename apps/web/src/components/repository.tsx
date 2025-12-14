import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@twending/api/routers/index";
import { EyeIcon, GitBranchIcon, ScaleIcon, StarIcon } from "lucide-react";
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

function getAvatarUrl(avatarUrl: string) {
  const githubUrl = avatarUrl.replace("https://", "").replace("?v=4", "");
  const searchParams = new URLSearchParams({
    url: githubUrl,
    w: "40",
    h: "40",
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
      className={cn("hover:bg-border/10 p-4", className)}
      render={
        <a href={repository.html_url} target="_blank">
          <ItemMedia variant="image">
            <img
              className="object-cover"
              src={
                repository.owner?.avatar_url
                  ? getAvatarUrl(repository.owner?.avatar_url)
                  : undefined
              }
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
              {repository.license && (
                <span>
                  <ScaleIcon />
                  {repository.license?.spdx_id}
                </span>
              )}
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
