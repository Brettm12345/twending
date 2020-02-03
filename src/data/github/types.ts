import { RemoteData } from '@devexperts/remote-data-ts'
import { Task } from 'fp-ts/lib/Task'
import { List } from 'list'

type Maybe<T> = T | null

export interface Repo {
  author: User
  createdAt: string
  description: Maybe<string>
  forks: number
  issues: number
  id: string
  language: Maybe<string>
  name: string
  stars: number
  url: string
}

export interface User {
  avatar: string
  name: string
  url: string
}
export type RemoteRepos = RemoteData<Error, List<Repo>>
export type RepoTask = Task<RemoteRepos>
