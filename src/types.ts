export interface User {
  avatar: string
  name: string
  url: string
}

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

export type PeriodLabel =
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Annually'

export type Period = 'day' | 'week' | 'month' | 'year'
export interface LanguageOption {
  label: string
  value: string
}
export interface PeriodOption {
  label: PeriodLabel
  value: Period
}
