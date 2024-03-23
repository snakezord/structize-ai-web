'use client';

// @mui
import { Box, IconButton, IconButtonProps } from '@mui/material';
import { m } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

// ----------------------------------------------------------------------

const IconButtonAnimate = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, size = 'medium', disabled, ...other }, ref) => (
    <AnimateWrap size={size} disabled={disabled}>
      <IconButton size={size} disabled={disabled} ref={ref} {...other}>
        {children}
      </IconButton>
    </AnimateWrap>
  )
);

IconButtonAnimate.displayName = 'IconButtonAnimate';

export default IconButtonAnimate;

// ----------------------------------------------------------------------

type AnimateWrapProp = {
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
};

export function AnimateWrap({
  size,
  children,
  disabled = false,
}: AnimateWrapProp) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Box
      component={m.div}
      whileTap='tap'
      whileHover='hover'
      variants={
        (disabled && {}) ||
        (isSmall && varSmall) ||
        (isLarge && varLarge) ||
        varMedium
      }
      sx={{
        display: 'inline-flex',
      }}
    >
      {children}
    </Box>
  );
}
