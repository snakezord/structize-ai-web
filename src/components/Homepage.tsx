import { Box } from '@mui/material';

import CustomNodeFlow from '@/components/shared/canvas';

export default function Homepage() {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <CustomNodeFlow />
    </Box>
  );
}
