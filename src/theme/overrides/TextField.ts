import { Theme } from '@mui/material/styles';

export default function TextField(theme: Theme) {
  return {
    MuiTextField: {
      defaultProps: {
        size: 'small' as const,
        variant: 'standard',
        FormHelperTextProps: {
          sx: {
            position: 'absolute',
            bottom: '-1.5em',
          },
        },
      },
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadiusMd,
        },
      },
    },
  };
}
