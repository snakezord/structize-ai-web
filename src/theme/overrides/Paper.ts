import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Paper(theme: Theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined' as const,
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 8px 16px -8px #0F0F0F1A',
          backgroundImage: 'none',
          borderRadius: theme.shape.borderRadiusXlg,
        },
      },
    },
  };
}
