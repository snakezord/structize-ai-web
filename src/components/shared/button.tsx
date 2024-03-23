'use client';

import { Box, Button, ButtonTypeMap, CircularProgress } from '@mui/material';
import React, { ReactNode } from 'react';

type ButtonProps = ButtonTypeMap['props'];

export interface Props extends ButtonProps {
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  analyticsFn?: () => void;
  children: ReactNode;
}

const CustomButton: React.FC<Props> = ({
  children,
  handleClick,
  loading,
  type = 'button',
  analyticsFn,
  ...buttonProps
}) => {
  return (
    <Button
      sx={{ minWidth: 'fit-content' }}
      onClick={(e) => {
        if (handleClick) handleClick(e);
        if (analyticsFn) analyticsFn();
      }}
      type={type}
      variant='contained'
      color='primary'
      disabled={loading}
      {...buttonProps}
    >
      <CircularProgress
        thickness={6}
        size={getProgressSize(buttonProps.size)}
        color='primary'
        sx={{ display: loading ? 'block' : 'none', position: 'absolute' }}
      />
      <Box sx={{ opacity: loading ? 0.25 : 1 }}>{children}</Box>
    </Button>
  );
};

export default CustomButton;

const getProgressSize = (size?: 'small' | 'medium' | 'large' | undefined) => {
  switch (size) {
    case 'small':
      return 18;
    case 'medium':
      return 22;
    case 'large':
      return 26;
    default:
      return 20;
  }
};
