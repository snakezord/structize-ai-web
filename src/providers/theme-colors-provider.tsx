'use client';

// @mui
import {
  alpha,
  createTheme,
  ThemeProvider,
  useTheme,
} from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';

// hooks
import { useSettings } from './app-settings-provider';
//
import componentsOverride from '../theme/overrides';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ThemeColorPresets({ children }: Props) {
  const defaultTheme = useTheme();
  const { currentColor } = useSettings();

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: currentColor,
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(currentColor.main, 0.24)}`,
      },
    }),
    [currentColor, defaultTheme]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
