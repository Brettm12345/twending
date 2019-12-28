import { Props } from 'react-select'

export interface User {
  avatar: string;
  name: string;
  url: string;
}

export interface Repo {
  author: User;
  createdAt: string;
  description: string | null;
  forks: number;
  issues: number;
  id: string;
  language: string | null;
  name: string;
  stars: number;
  url: string;
}

export interface SelectProps<T> extends Props<T> {
  value: T;
}

export type PeriodLabel = "Daily" | "Weekly" | "Monthly" | "Annually";
export type Period = "day" | "week" | "month" | "year";
export interface PeriodOption {
  label: PeriodLabel;
  value: Period;
}

export interface LanguageOption {
  value: string;
  label: string;
}
