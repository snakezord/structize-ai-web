import { Theme } from '@mui/material';
// ----------------------------------------------------------------------

export default function Chip(theme: Theme) {
  return {
    MuiChip: {
      styleOverrides: {
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.text.secondary,
          },
        },
        outlined: {
          fontSize: theme.typography.overline.fontSize,
          fontWeight: theme.typography.overline.fontWeight,
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main,
          },
          '&.MuiChip-colorSecondary': {
            borderColor: theme.palette.secondary.main,
          },
        },
        filled: {
          fontSize: theme.typography.overline.fontSize,
          fontWeight: theme.typography.overline.fontWeight,
        },
        //
        avatarColorInfo: {
          color: theme.palette.info.contrastText,
          backgroundColor: theme.palette.info.dark,
        },
        avatarColorSuccess: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.success.dark,
        },
        avatarColorWarning: {
          color: theme.palette.warning.contrastText,
          backgroundColor: theme.palette.warning.dark,
        },
        avatarColorError: {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.dark,
        },
      },
    },
  };
}
