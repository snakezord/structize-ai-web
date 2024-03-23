import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          // border: `1px solid ${theme.palette.divider}`,
          // '&:hover': {
          //   backgroundColor: theme.palette.grey[200],
          // },
          '&:not(:last-child)': {
            borderBottom: 0,
          },
          backgroundColor: 'transparent',
          '&::before': {
            display: 'none',
          },
          boxShadow: 'none',
          '&.Mui-expanded': {
            borderRadius: theme.shape.borderRadius,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          },
          '&:hover': {
            backgroundColor: theme.palette.divider,
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
      },
    },
  };
}
