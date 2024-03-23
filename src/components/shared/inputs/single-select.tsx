'use client';

import { MenuItem, TextField } from '@mui/material';
//
import { BaseTextFieldProps } from '@mui/material/TextField/TextField';
import { FC } from 'react';

export type ValueType = string | number;
export interface Props {
  options: string[];
  value: ValueType;
  helperText?: string;
  translateFn?: (option: string) => string;
  handleChange: (newVal: ValueType) => void;
  analyticsFn?: (newVal: ValueType) => void;
}

export type PropsExtendsTextField = Props & BaseTextFieldProps;

export const SingleSelect: FC<PropsExtendsTextField> = ({
  options = [],
  value,
  handleChange,
  required = true,
  translateFn,
  analyticsFn,
  ...rest
}) => {
  return (
    <TextField
      select
      size='small'
      value={value}
      onChange={(e) => {
        handleChange(e.target.value);
        if (analyticsFn) analyticsFn(e.target.value);
      }}
      {...rest}
    >
      {!required && (
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
      )}
      {options.map((option: string, index: number) => (
        <MenuItem key={`${option}-${index}`} value={option}>
          {translateFn ? translateFn(option) : option}
        </MenuItem>
      ))}
    </TextField>
  );
};
