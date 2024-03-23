import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        inputRoot: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  };
}
