import { Box, Stack } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import SignOutButton from '@/components/menu/sign-out-button';
import { IconButtonAnimate } from '@/components/shared/animations';
import CustomAvatar from '@/components/shared/avatar';
import { CustomPopper } from '@/components/shared/popper';

export const UserSessionMenu = () => {
  const session = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  if (!session?.data?.user) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: zIndex.fab,
      }}
    >
      <IconButtonAnimate onClick={handleClick}>
        <CustomAvatar
          src={session.data.user.image ?? ''}
          alt={session.data.user.name ?? 'Name'}
        />
      </IconButtonAnimate>

      <CustomPopper open={open} anchorEl={anchorEl}>
        <Stack gap={4}>
          <SignOutButton />
        </Stack>
      </CustomPopper>
    </Box>
  );
};
