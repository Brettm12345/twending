import { RiEyeLine, RiGitBranchLine, RiStarLine } from "@remixicon/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@twending/api/routers/index";
import type { ComponentProps } from "react";
import { LanguageIndicator } from "@/components/language-indicator";
import {
  Repository,
  RepositoryContent,
  RepositoryDescription,
  RepositoryFooter,
  RepositoryFooterItem,
  RepositoryMedia,
  RepositoryTitle,
} from "@/components/ui/repository";

type RouterOutput = inferRouterOutputs<AppRouter>;

interface GithubRepositoryProps extends ComponentProps<typeof Repository> {
  repository: RouterOutput["listRepositories"]["repositories"][number];
}

function formatNumber(number: number) {
  return Intl.NumberFormat("en-US").format(number);
}
function getAvatarUrl(avatarUrl: string, scale = 1) {
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

export function GithubRepository({
  repository,
  className,
  ...props
}: GithubRepositoryProps) {
  const avatarUrl = repository.owner.avatar_url;
  const imgSrcSet = [1, 2]
    .map((scale) => `${getAvatarUrl(avatarUrl, scale)} ${scale}x`)
    .join(", ");
  return (
    <Repository
      render={
        <a href={repository.html_url} rel="noopener" target="_blank">
          <RepositoryMedia>
            <img
              alt={repository.owner.login}
              height={40}
              srcSet={imgSrcSet}
              width={40}
            />
          </RepositoryMedia>
          <RepositoryContent>
            <RepositoryTitle>{repository.name}</RepositoryTitle>
            <RepositoryDescription>
              {repository.description ?? "No description"}
            </RepositoryDescription>
            <RepositoryFooter>
              <RepositoryFooterItem>
                <LanguageIndicator language={repository.language} />
                {repository.language ?? "Unknown"}
              </RepositoryFooterItem>
              <RepositoryFooterItem>
                <RiStarLine />
                {formatNumber(repository.stargazers_count)}
              </RepositoryFooterItem>
              <RepositoryFooterItem>
                <RiEyeLine />
                {formatNumber(repository.watchers_count)}
              </RepositoryFooterItem>
              <RepositoryFooterItem>
                <RiGitBranchLine />
                {formatNumber(repository.forks)}
              </RepositoryFooterItem>
            </RepositoryFooter>
          </RepositoryContent>
        </a>
      }
      {...props}
    />
  );
}
