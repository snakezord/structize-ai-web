// routes
import { SettingsValueProps } from '@/theme/@types/types';

// SETTINGS & COOKIES
// ----------------------------------------------------------------------

export const cookiesExpires = 3; // cookie expiration in days

export const cookiesKey = {
  themeMode: 'themeMode',
  themeColorPresets: 'themeColorPresets',
  themeLayout: 'themeLayout',
};

export const defaultSettings: SettingsValueProps = {
  themeMode: 'dark',
  themeColorPresets: 'cyan',
  themeLayout: 'horizontal',
};
