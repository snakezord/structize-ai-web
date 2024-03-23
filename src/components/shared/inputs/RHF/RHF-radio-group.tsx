'use client';

// form
// @mui
import {
  Box,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  options: string[];
  displayError?: boolean;
  getOptionLabel?: string[];
  getOptionDisabled?: boolean[];
  radioProps?: RadioProps;
}

export default function RHFRadioGroup({
  name,
  displayError = false,
  options,
  getOptionLabel,
  getOptionDisabled,
  radioProps,
  ...other
}: IProps & RadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <RadioGroup {...field} row {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio {...radioProps} />}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
                disabled={
                  getOptionDisabled?.length ? getOptionDisabled[index] : false
                }
              />
            ))}
          </RadioGroup>

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
