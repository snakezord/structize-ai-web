'use client';

import { Typography } from '@mui/material';
//
import Avatar, { AvatarTypeMap } from '@mui/material/Avatar';
//
import Link from 'next/link';
import { FC } from 'react';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name?: string | undefined) {
  if (!name) return {};
  return {
    children: (
      <Typography variant='overline' fontSize='inherit'>
        {`${name.split(' ')[0]?.[0] || name[0]}${
          name.split(' ')[1]?.[0] || ''
        }`}
      </Typography>
    ),
  };
}

export type Props = AvatarTypeMap['props'] & {
  href?: string;
  handleClick?: () => void;
};

const CustomAvatar: FC<Props> = ({ href, handleClick, ...props }) => {
  const { alt: name, sx, src: avatarSrc } = props;

  if (!href) {
    return (
      <Avatar
        {...stringAvatar(name)}
        {...props}
        onClick={handleClick}
        sx={{
          bgcolor: name && !avatarSrc ? stringToColor(name) : '',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          ...sx,
        }}
      />
    );
  }

  return (
    <Link href={href}>
      <Avatar
        {...stringAvatar(name)}
        {...props}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        sx={{
          bgcolor: name && !avatarSrc ? stringToColor(name) : '',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          cursor: 'pointer',
          ...sx,
        }}
      />
    </Link>
  );
};

export default CustomAvatar;
