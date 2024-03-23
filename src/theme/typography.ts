import { DM_Sans } from 'next/font/google';

function pxToRem(value: number) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({
  sm,
  md,
  lg,
}: {
  sm: number;
  md: number;
  lg: number;
}) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const dm_sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const FONT_PRIMARY = dm_sans;

const typography = {
  fontFamily: [FONT_PRIMARY.style.fontFamily].join(','),
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 600,
    lineHeight: 80 / 64,
    fontSize: pxToRem(36),
    ...responsiveFontSizes({ sm: 36, md: 38, lg: 40 }),
  },
  h2: {
    fontWeight: 600,
    lineHeight: 64 / 48,
    fontSize: pxToRem(29),
    ...responsiveFontSizes({ sm: 29, md: 31, lg: 33 }),
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.25,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 24, md: 26, lg: 28 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.3,
    fontSize: pxToRem(19),
    ...responsiveFontSizes({ sm: 19, md: 21, lg: 23 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 17, md: 18, lg: 19 }),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 16, md: 16, lg: 16 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: pxToRem(16),
  },
  caption: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'none',
  },
} as const;

export default typography;
