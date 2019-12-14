import { mapObjIndexed, mergeDeepRight } from 'ramda'
import React from 'react'
import { Styles } from 'react-select'
import { CSSObject } from 'styled-components'
import twTheme from 'theme'

import ReactSelect, { SelectProps } from '@atlaskit/select'

const { colors } = twTheme;

export const makeOption = <L extends string>(label: L) => ({
  label,
  value: label
});

type StyleMap = {
  [key in keyof Styles]: CSSObject;
};

const overrides: StyleMap = {
  container: {
    width: 150
  },
  control: {
    backgroundColor: colors.gray[700],
    borderColor: "transparent",
    ":hover": {
      backgroundColor: colors.gray[500],
      borderColor: "transparent"
    }
  },
  singleValue: {
    lineHeight: "initial",
    color: colors.gray[200]
  },
  dropdownIndicator: {
    color: colors.gray[400],
    ":hover": {
      color: colors.gray[300]
    }
  },
  input: {
    color: colors.white
  },
  menu: {
    backgroundColor: colors.gray[700]
  }
};

const styles: Styles = mapObjIndexed(
  (style: CSSObject) => (base: React.CSSProperties) =>
    mergeDeepRight(base, style as CSSObject),
  overrides
);

const Select: React.FC<SelectProps<any>> = props => (
  <ReactSelect
    className="mx-2"
    styles={
      {
        option: (base, { isFocused, isSelected }) =>
          mergeDeepRight(base, {
            color: colors.white,
            cursor: "pointer",
            backgroundColor: isSelected
              ? "rgba(255, 255, 255, 0.1)"
              : isFocused
              ? "rgba(255, 255, 255, 0.04)"
              : null,
            ":active": {
              backgroundColor: isSelected
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(255, 255, 255, 0.08)"
            }
          }),
        ...styles
      } as Styles
    }
    {...props}
  />
);

export default Select;
