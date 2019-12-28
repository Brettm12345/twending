import { FC } from 'react'
import {
  IssueOpened,
  RepoForked,
  Star
} from 'styled-icons/octicons'
import { cn } from 'ts-classnames'
import { Repo as RepoType } from 'types'

import Avatar from './avatar'
import Language from './language'

interface RepoProps extends Omit<RepoType, "id"> {
  isLast: boolean;
}

const RepoItem: FC<RepoProps> = ({
  author,
  description = "No description given",
  forks,
  issues,
  language,
  isLast,
  name,
  stars,
  url
}) => (
  <li
    className={cn(
      "flex",
      "p-6",
      "pb-4",
      "md:p-8",
      "hover:bg-gray-900",
      "transition-bg"
    )}
  >
    <Avatar {...author} />
    <a className={cn("flex", "flex-col", "flex-grow")} href={url}>
      <h3 className={cn("mb-1", "text-lg", "text-white")}>
        {author.name}/{name}
      </h3>
      <p className={cn("max-w-3xl", "mb-4", "text-gray-300")}>{description}</p>
      <div className={cn("flex", "mt-auto", "text-sm", "text-gray-400")}>
        <Language>{language || "Unknown"}</Language>
        {[
          [<Star />, stars],
          [<RepoForked />, forks],
          [<IssueOpened />, issues]
        ].map(([icon, value], index) => (
          <span key={index} className={cn("inline-flex", "mr-4", "repo-icon")}>
            {icon}
            &nbsp;{value}
          </span>
        ))}
      </div>
    </a>
    {!isLast && <hr className={cn("border-gray-900")} />}
  </li>
);

export default RepoItem;
