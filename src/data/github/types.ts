import { RemoteData } from '@devexperts/remote-data-ts'
import { Task } from 'fp-ts/lib/Task'

export interface Repo {
  author: User
  createdAt: string
  description: string | null
  forks: number
  issues: number
  id: string
  language: string | null
  name: string
  stars: number
  url: string
}

export interface User {
  avatar: string
  name: string
  url: string
}
export type RemoteRepos = RemoteData<Error, Repo[]>
export type RepoTask = Task<RemoteRepos>
