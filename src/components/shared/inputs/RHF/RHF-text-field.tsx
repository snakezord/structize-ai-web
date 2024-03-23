'use client';

// @mui
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
// form
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface Props {
  name: string;
}

export default function RHFTextField({
  name,
  ...other
}: Props & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          fullWidth
          value={value || ''}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
