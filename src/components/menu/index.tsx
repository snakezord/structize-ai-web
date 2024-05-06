import { Stack, Typography } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

import { ActionPreview } from '@/components/canvas/components/action';
import { TriggerPreview } from '@/components/canvas/components/trigger';
import { FabButtonAnimate } from '@/components/shared/animations';
import { CustomPopper } from '@/components/shared/popper';

export const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <FabButtonAnimate
        size='small'
        sxWrap={{ position: 'absolute', top: 20, left: 20, zIndex: zIndex.fab }}
        onClick={handleClick}
      >
        {open ? <IconMinus /> : <IconPlus />}
      </FabButtonAnimate>

      <CustomPopper open={open} anchorEl={anchorEl}>
        <Stack gap={4}>
          <Typography variant='h4'>Nodes</Typography>
          <Stack
            minWidth={200}
            alignItems='center'
            justifyContent='center'
            gap={2}
          >
            <TriggerPreview />
            <ActionPreview />
          </Stack>
        </Stack>
      </CustomPopper>
    </>
  );
};
