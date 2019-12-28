import { FC } from 'react'

import ReactSelect, { SelectProps } from '@atlaskit/select'

export const makeOption = <L extends string>(label: L) => ({
  label,
  value: label
});

const Select: FC<SelectProps<any>> = props => (
  <ReactSelect
    className="select-container"
    classNamePrefix="select"
    styles={{
      option: (base, { isFocused, isSelected }) =>
        Object.assign(base, {
          backgroundColor: isSelected
            ? "rgba(255, 255, 255, 0.1)"
            : isFocused
            ? "rgba(255, 255, 255, 0.04)"
            : null,
          "&:active": {
            backgroundColor: isSelected
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(255, 255, 255, 0.08)"
          }
        })
    }}
    {...props}
  />
);

export default Select;
