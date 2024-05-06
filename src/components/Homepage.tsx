'use client';

import { Box } from '@mui/material';

import Canvas from '@/components/canvas';

export default function Homepage() {
  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas />
    </Box>
  );
}
