import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        // default
        root: {
          whiteSpace: 'nowrap',
          textAlign: 'center',
          borderRadius: '90px',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        containedInfo: {
          boxShadow: theme.customShadows.info,
        },
        containedSuccess: {
          boxShadow: theme.customShadows.success,
        },
        containedWarning: {
          boxShadow: theme.customShadows.warning,
        },
        containedError: {
          boxShadow: theme.customShadows.error,
        },
        // outlined
        outlined: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.common.white,
            fill: theme.palette.common.white,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
