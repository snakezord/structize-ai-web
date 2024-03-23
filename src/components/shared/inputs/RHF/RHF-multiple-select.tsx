'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  MultipleSelect,
  Props as MultipleSelectProps,
} from '../multiple-select';

interface RHFSelectProps
  extends Omit<MultipleSelectProps, 'handleChange' | 'value'> {
  name: string;
}

export const RHFMultipleSelect: FC<RHFSelectProps> = ({
  name,
  ...otherProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <MultipleSelect
          value={value || []}
          handleChange={onChange}
          error={!!error}
          helperText={error?.message}
          {...otherProps}
        />
      )}
    />
  );
};
