'use client';

//
import {
  Autocomplete,
  AutocompleteRenderOptionState,
  Paper,
  PaperProps,
  TextField,
} from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import React from 'react';

export type ValueType = string | null;

export interface Props {
  options: string[];
  selectedValue: ValueType;
  groupBy?: (option: string) => string;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: string,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  loading?: boolean;
  freeSolo?: boolean;
  autoHighlight?: true;
  handleSelect: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => void;
}

const CustomPaper = (props: PaperProps) => {
  return <Paper sx={{ mb: 1 }} {...props} />;
};

export const SearchableSingleSelect: React.FC<Props & TextFieldProps> = ({
  options = [],
  selectedValue,
  loading,
  freeSolo,
  groupBy,
  autoHighlight = true,
  handleSelect,
  ...restProps
}) => {
  return (
    <Autocomplete
      groupBy={groupBy}
      PaperComponent={CustomPaper}
      fullWidth
      renderOption={(props, option) => {
        return (
          <li {...props} key={option}>
            {option}
          </li>
        );
      }}
      freeSolo={freeSolo}
      autoHighlight={autoHighlight}
      size='small'
      options={options}
      loading={loading}
      getOptionLabel={(option) => option}
      value={selectedValue === '' ? null : selectedValue}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField {...params} {...restProps} variant='outlined' />
      )}
    />
  );
};
