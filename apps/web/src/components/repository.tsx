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

export function Repository({
  repository,
  className,
  ...props
}: {
  repository: inferRouterOutputs<AppRouter>["listRepositories"]["repositories"][number];
} & ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn("hover:bg-border/10 py-8 px-6", className)}
      asChild
      {...props}
    >
      <a href={repository.html_url} target="_blank">
        <ItemMedia variant="image">
          <img
            className="object-cover"
            src={repository.owner?.avatar_url}
            alt={repository.owner?.login}
            width={100}
            height={100}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{repository.name}</ItemTitle>
          <ItemDescription>
            {repository.description ?? "No description"}
          </ItemDescription>
          <ItemFooter className="justify-start [&>span]:text-sm [&>span]:font-normal [&>span]:text-muted-foreground [&>span]:inline-flex [&>span]:items-center [&>span]:gap-1 [&>span>svg]:size-4">
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
              {repository.forks_count}
            </span>
          </ItemFooter>
        </ItemContent>
      </a>
    </Item>
  );
}
