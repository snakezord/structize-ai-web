import { Divider, Paper, Stack, Typography } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

import { IconButtonAnimate } from '@/components/shared/animations';
import CustomAvatar from '@/components/shared/avatar';
import { NodeType } from '@/components/canvas/types';

type Props = {
  name: string;
  handleDelete: VoidFunction;
} & PropsWithChildren;

export const CanvasComponentWrapper = ({ children, ...other }: Props) => {
  return (
    <Paper variant='outlined'>
      <Stack p={2} pb={2.5} gap={2}>
        <Header {...other} />
        <Divider>INPUTS</Divider>
        {children}
      </Stack>
    </Paper>
  );
};

const Header = ({
  name,
  handleDelete,
}: {
  name: string;
  handleDelete: VoidFunction;
}) => {
  return (
    <Stack
      gap={4}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
    >
      <Stack gap={1} direction='row' alignItems='center'>
        <CustomAvatar alt={name} />
        <Typography>{name}</Typography>
      </Stack>
      <Stack gap={1} direction='row' alignItems='center'>
        <IconButtonAnimate onClick={handleDelete}>
          <IconTrash />
        </IconButtonAnimate>
      </Stack>
    </Stack>
  );
};

export const PreviewWrapper = ({
  type,
  children,
}: { type: NodeType } & PropsWithChildren) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeType
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <Paper
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      sx={{ width: 1, backgroundColor: 'background.default', cursor: 'move' }}
    >
      <Stack p={1} alignItems='center'>
        {children}
      </Stack>
    </Paper>
  );
};
