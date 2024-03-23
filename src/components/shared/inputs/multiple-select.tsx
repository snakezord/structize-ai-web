'use client';

//
import {
  Autocomplete,
  Chip,
  Paper,
  PaperProps,
  TextField,
} from '@mui/material';
import { BaseTextFieldProps } from '@mui/material/TextField/TextField';
import React from 'react';

export interface Props extends BaseTextFieldProps {
  options: string[];
  value: string[];
  handleChange: (newValue: string[]) => void;
  loading?: boolean;
  disabled?: boolean;
  limitTags?: number;
  getOptionDisabled?: (option: string) => boolean;
}

const CustomPaper = (props: PaperProps) => {
  return <Paper sx={{ mb: 1 }} {...props} />;
};

export const MultipleSelect: React.FC<Props> = ({
  options = [],
  value,
  loading,
  disabled,
  limitTags = 3,
  handleChange,
  getOptionDisabled,
  ...restProps
}) => {
  return (
    <Autocomplete
      PaperComponent={CustomPaper}
      multiple
      fullWidth
      size='small'
      ChipProps={{ size: 'small', variant: 'outlined' }}
      loading={loading}
      limitTags={limitTags}
      disabled={disabled}
      options={options}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            variant='outlined'
            size='small'
            key={option}
            label={option}
          />
        ));
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option}>
            {option}
          </li>
        );
      }}
      getOptionLabel={(option) => option}
      getOptionDisabled={getOptionDisabled}
      value={value}
      onChange={(_, newValue) => handleChange(newValue)}
      renderInput={(params) => (
        <TextField {...params} {...restProps} variant='outlined' />
      )}
    />
  );
};
