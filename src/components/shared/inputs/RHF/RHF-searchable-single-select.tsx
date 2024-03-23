'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Props as SearchableSingleSelectProps,
  SearchableSingleSelect,
} from '../searchable-single-select';

interface Props
  extends Omit<SearchableSingleSelectProps, 'handleSelect' | 'value'> {
  name: string;
}

export const RHFSearchableSingleSelect: FC<Props> = ({
  name,
  ...otherProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <SearchableSingleSelect
            value={value || null}
            handleSelect={(_, newValue) => onChange(newValue)}
            error={!!error}
            helperText={error?.message}
            {...otherProps}
          />
        );
      }}
    />
  );
};
