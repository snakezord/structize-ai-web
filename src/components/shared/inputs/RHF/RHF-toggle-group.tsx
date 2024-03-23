'use client';

// form
// @mui
import {
  Box,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  options: string[];
  displayError?: boolean;
  getOptionLabel?: string[];
  getOptionDisabled?: boolean[];
}

export default function RHFToggleGroup({
  name,
  displayError = false,
  options,
  getOptionLabel,
  getOptionDisabled,
  ...other
}: IProps & ToggleButtonGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box
          sx={{
            position: 'relative',
            '& .MuiToggleButton-root': {
              margin: '0 !important',
            },
          }}
        >
          <ToggleButtonGroup {...field} {...other}>
            {options.map((option, index) => (
              <ToggleButton
                sx={{
                  background: (theme) => theme.palette.background.default,
                }}
                key={option}
                value={option}
                disabled={
                  getOptionDisabled?.length ? getOptionDisabled[index] : false
                }
              >
                {getOptionLabel?.length ? getOptionLabel[index] : option}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {displayError && !!error && (
            <FormHelperText error sx={{ px: 1, my: 0 }}>
              {error.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
