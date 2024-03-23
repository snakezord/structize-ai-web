import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Select(theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  };
}
