export type Label =
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Annually'

export type Value = 'day' | 'week' | 'month' | 'year'

export interface OptionType {
  label: Label
  value: Value
}
