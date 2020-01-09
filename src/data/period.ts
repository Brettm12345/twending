export type Label =
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Annually'

export type Value = 'day' | 'week' | 'month' | 'year'

export interface Option {
  label: Label
  value: Value
}
