'use client';

// @mui
import { Box, BoxProps } from '@mui/material';
import { m, MotionProps } from 'framer-motion';

//
import { Props as PropsVarContainer, varContainer } from './variants';

// ----------------------------------------------------------------------

type IProps = BoxProps & MotionProps;

export interface Props extends IProps {
  animate?: boolean;
  action?: boolean;
  varContainerProps?: PropsVarContainer;
}

export default function MotionContainer({
  animate,
  action = false,
  varContainerProps,
  children,
  ...other
}: Props) {
  if (action) {
    return (
      <Box
        component={m.div}
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer(varContainerProps)}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={m.div}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={varContainer(varContainerProps)}
      {...other}
    >
      {children}
    </Box>
  );
}
