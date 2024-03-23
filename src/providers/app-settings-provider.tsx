/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import Cookies from 'js-cookie';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

//
import {
  cookiesExpires,
  cookiesKey,
  defaultSettings as defaultSettingsStatic,
} from '@/config/app.config';

// config
// @type
import {
  SettingsContextProps,
  SettingsValueProps,
  ThemeColorPresets,
  ThemeLayout,
  ThemeMode,
} from '../theme/@types/types';
// utils
import getColorPresets, {
  colorPresets,
  defaultPreset,
} from '../theme/utils/get-color-presets';

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSettingsStatic,
  onChangeMode: () => {},
  onToggleMode: () => {},
  onChangeColor: () => {},
  onChangeLayout: () => {},
  onResetSetting: () => {},
  currentColor: defaultPreset,
  colorOption: [],
};

const SettingsContext = createContext(initialState);

type SettingsProviderProps = {
  children: ReactNode;
  defaultSettings?: SettingsValueProps;
};

function SettingsProvider({
  children,
  defaultSettings = defaultSettingsStatic as SettingsValueProps,
}: SettingsProviderProps) {
  const [settings, setSettings] = useSettingCookies(defaultSettings);

  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeMode: (event.target as HTMLInputElement).value as ThemeMode,
    });
  };

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onChangeColor = (newColorPreset: ThemeColorPresets) => {
    setSettings({
      ...settings,
      themeColorPresets: newColorPreset,
    });
  };

  const onChangeLayout = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeLayout: (event.target as HTMLInputElement).value as ThemeLayout,
    });
  };

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeColorPresets: initialState.themeColorPresets,
      themeLayout: initialState.themeLayout,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        onToggleMode,
        // Color
        onChangeColor,
        currentColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
        // Navbar Horizontal
        onChangeLayout,
        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

const useSettings = () => useContext(SettingsContext);

export { SettingsContext, SettingsProvider, useSettings };

// ----------------------------------------------------------------

const useSettingCookies = (
  defaultSettings: SettingsValueProps
): [SettingsValueProps, Dispatch<SetStateAction<SettingsValueProps>>] => {
  // State
  const [settings, setSettings] = useState<SettingsValueProps>(defaultSettings);
  // Handle change
  const onChangeSetting = useCallback(() => {
    Cookies.set(cookiesKey.themeMode, settings.themeMode, {
      expires: cookiesExpires,
    });

    Cookies.set(cookiesKey.themeColorPresets, settings.themeColorPresets, {
      expires: cookiesExpires,
    });

    Cookies.set(cookiesKey.themeLayout, settings.themeLayout, {
      expires: cookiesExpires,
    });
  }, [settings.themeColorPresets, settings.themeLayout, settings.themeMode]);

  useEffect(() => {
    onChangeSetting();
  }, [onChangeSetting]);

  return [settings, setSettings];
};
