'use client';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Box, GlobalStyles } from '@mui/material';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { ReactNode, useRef } from 'react';

//
import { IconButtonAnimate } from '../components/shared/animations';
import { ColorSchema } from '../theme/palette';

// ----------------------------------------------------------------------

const SnackbarStyles = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <GlobalStyles
      styles={{
        '#root': {
          '& .SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            boxShadow: theme.customShadows.z24,
            borderRadius: theme.shape.borderRadiusMd,
            color: theme.palette.grey[isLight ? 0 : 800],
            backgroundColor: theme.palette.grey[isLight ? 900 : 0],
            '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,
            '& svg': { width: 20, height: 20 },
          },
        },
      }}
    />
  );
};

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

const NotistackProvider = ({ children }: Props) => {
  const notistackRef = useRef<any>(null);

  const onClose = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant='success' // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          info: <SnackbarIcon icon='info' color='info' />,
          success: <SnackbarIcon icon='success' color='success' />,
          warning: <SnackbarIcon icon='warning' color='warning' />,
          error: <SnackbarIcon icon='error' color='error' />,
        }}
        // With close as default
        action={(key) => (
          <IconButtonAnimate
            size='small'
            onClick={onClose(key)}
            sx={{ p: 0.5 }}
          >
            <CloseRoundedIcon />
          </IconButtonAnimate>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
};

export default NotistackProvider;

// ----------------------------------------------------------------------

type SnackbarIconProps = {
  icon: 'success' | 'info' | 'warning' | 'error';
  color: ColorSchema;
};

const SnackbarIcon = ({ icon, color }: SnackbarIconProps) => {
  return (
    <Box
      component='span'
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      {getCorrectIcon(icon)}
    </Box>
  );
};

const getCorrectIcon = (icon: 'success' | 'info' | 'warning' | 'error') => {
  switch (icon) {
    case 'success':
      return <CheckCircleRoundedIcon />;
    case 'info':
      return <InfoRoundedIcon />;
    case 'warning':
      return <WarningRoundedIcon />;
    case 'error':
      return <WarningRoundedIcon />;
  }
};
