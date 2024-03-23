'use client';

import {
  Skeleton,
  SkeletonProps,
  SxProps,
  Theme,
  Typography,
  TypographyVariant,
} from '@mui/material';
// Animations
import { AnimatePresence, m } from 'framer-motion';
import { FC } from 'react';

import { varZoom } from './variants';

const AnimatedData: FC<{
  data: number | string;
  sx?: SxProps<Theme>;
  variant?: TypographyVariant;
  loading?: boolean;
  skeletonProps?: SkeletonProps;
}> = ({ data, sx, variant = 'h3', loading = false, skeletonProps }) => {
  return (
    <AnimatePresence mode='wait'>
      <Typography
        sx={{ whiteSpace: 'nowrap', ...sx }}
        key={data}
        component={m.span}
        // initial={varFade().in.initial}
        // animate={varFade({ durationIn: 0.2 }).in.animate}
        // exit={varFade({ durationOut: 0.2 }).out.exit}
        {...varZoom({ durationIn: 0.1, durationOut: 0.1 }).in}
        variant={variant}
      >
        {loading ? <Skeleton width='40px' {...skeletonProps} /> : `${data}`}
      </Typography>
    </AnimatePresence>
  );
};

export default AnimatedData;
