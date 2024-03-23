/* eslint-disable no-unused-vars */
// ----------------------------------------------------------------------
import React from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeColorPresets =
  | 'default'
  | 'purple'
  | 'cyan'
  | 'blue'
  | 'orange'
  | 'red';
export type ThemeLayout = 'vertical' | 'horizontal';

type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type SettingsValueProps = {
  themeMode: ThemeMode;
  themeColorPresets: ThemeColorPresets;
  themeLayout: ThemeLayout;
};

export type SettingsContextProps = {
  themeMode: ThemeMode;
  themeColorPresets: ThemeColorPresets;
  themeLayout: ThemeLayout;
  currentColor: ColorVariants;
  colorOption: {
    name: string;
    value: string;
  }[];
  onToggleMode: () => void;
  onResetSetting: () => void;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (newColorPreset: ThemeColorPresets) => void;
  onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
