'use client';

// MUI
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactNode, useMemo } from 'react';

import { useSettings } from './app-settings-provider';
import MotionLazyProvider from './motion-lazy-provider';
import NotistackProvider from './notistack-snackbar-provider';
// Providers
import ThemeColorPresets from './theme-colors-provider';
import breakpoints from '../theme/breakpoints';
// Global Styles
import GlobalStyles from '../theme/custom-styles/global-styles';
// Overrides
import componentsOverride from '../theme/overrides';
// Theme customs
import palette from '../theme/palette';
import shadows, { customShadows } from '../theme/shadows';
import shape from '../theme/shape';
import typography from '../theme/typography';

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { themeMode } = useSettings();

  const isLight = themeMode === 'light';

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      shape,
      breakpoints,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <AppRouterCacheProvider>
      <MUIThemeProvider theme={theme}>
        <ThemeColorPresets>
          <GlobalStyles />
          <MotionLazyProvider>
            <NotistackProvider>{children}</NotistackProvider>
          </MotionLazyProvider>
        </ThemeColorPresets>
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  );
}
