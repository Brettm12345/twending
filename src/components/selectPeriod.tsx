import Select from 'components/select'
import { map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { FC } from 'react'
import { Props } from 'react-select'
import { Period, PeriodLabel, PeriodOption } from 'types'

const SelectPeriod: FC<Props<PeriodOption>> = props => (
  <Select
    {...props}
    options={pipe(
      [
        ["Daily", "day"],
        ["Weekly", "week"],
        ["Monthly", "month"],
        ["Annually", "year"]
      ],
      map(
        ([label, value]: [PeriodLabel, Period]): PeriodOption => ({
          label,
          value
        })
      )
    )}
    isSearchable={false}
  />
);

export default SelectPeriod;
