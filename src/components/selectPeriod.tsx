import Select from 'components/select'
import React from 'react'
import { PeriodOption, SelectProps } from 'types'

const options: PeriodOption[] = [
  { label: "Daily", value: "day" },
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
  { label: "Annually", value: "year" }
];

const SelectPeriod: React.FC<SelectProps<PeriodOption>> = props => (
  <Select {...props} options={options} />
);

export default SelectPeriod;
