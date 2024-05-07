import { Paper, SxProps, Theme, useTheme } from '@mui/material';
import Fade from '@mui/material/Fade';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import zIndex from '@mui/material/styles/zIndex';
import { ReactNode } from 'react';

import backGroundStyles from '@/theme/custom-styles/background-styles';

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
  open: boolean;
  anchorEl: HTMLElement | null;
  placement?: PopperPlacementType;
}

export const CustomPopper: React.FC<Props> = ({
  children,
  open,
  anchorEl,
  sx,
  placement = 'bottom-start',
}) => {
  const theme = useTheme();

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'feedback-popper' : undefined;

  return (
    <Popper
      placement={placement}
      sx={{ ...sx, zIndex: zIndex.appBar }}
      id={id}
      open={open}
      anchorEl={anchorEl}
      transition
      disablePortal
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              p: 2,
              mt: 1,
              ...backGroundStyles(theme).bgBlur({
                blur: 5,
                opacity: 0.85,
                color: theme.palette.background.default,
              }),
            }}
          >
            {children}
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};
