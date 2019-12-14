import React from 'react'
import {
  IssueOpened,
  RepoForked,
  Star
} from 'styled-icons/octicons'
import { Repo } from 'types'

interface RepoProps extends Omit<Repo, "id"> {
  isLast: boolean;
}

const RepoItem: React.FC<RepoProps> = ({
  author,
  description,
  forks,
  issues,
  isLast,
  name,
  stars,
  url
}) => (
  <li>
    <a
      className="flex px-8 pt-8 pb-4 hover:bg-gray-900 transition-bg"
      href={url}
    >
      <div className="flex-shrink-0 w-1/6 pt-1 mr-8 md:w-1/8 lg:w-1/12">
        <a href={author.url}>
          <img className="rounded-lg" src={author.avatar} alt="Author avatar" />
        </a>
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="mb-1 text-lg text-white">
          {author.name}/{name}
        </h3>
        <p className="max-w-3xl mb-4 text-gray-300">
          {description || "No description given"}
        </p>
        <div className="mt-auto text-sm text-gray-400">
          {[
            [<Star />, stars],
            [<RepoForked />, forks],
            [<IssueOpened />, issues]
          ].map(([icon, value], index) => (
            <span key={index} className="mr-4 repo-icon">
              {icon}
              &nbsp;{value}
            </span>
          ))}
        </div>
      </div>
    </a>
    {!isLast && <hr className="border-gray-900" />}
  </li>
);

export default RepoItem;
