'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PropsExtendsTextField, SingleSelect } from '../single-select';

interface Props extends Omit<PropsExtendsTextField, 'handleChange' | 'value'> {
  name: string;
}

export const RHFSingleSelect: FC<Props> = ({ name, label, ...otherProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <SingleSelect
            error={!!error}
            helperText={error?.message}
            label={label}
            value={value || null}
            handleChange={(newValue) => onChange(newValue)}
            {...otherProps}
          />
        );
      }}
    />
  );
};
