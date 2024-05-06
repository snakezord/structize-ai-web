import { Typography } from '@mui/material';
import { Handle, NodeProps, Position } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';

import {
  CanvasComponentWrapper,
  PreviewWrapper,
} from '@/components/canvas/components/wrapper';
import useStore from '@/components/canvas/store';

export const Trigger = (props: NodeProps) => {
  const [nodes, setNodes] = useStore(
    useShallow((state) => [state.nodes, state.setNodes])
  );

  const handleDelete = () => {
    setNodes(nodes.filter((node) => node.id !== props.id));
  };

  return (
    <>
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ background: '#555', width: 15, height: 15 }}
        isConnectable={props.isConnectable}
      />
      <CanvasComponentWrapper name='TRIGGER' handleDelete={handleDelete}>
        None
      </CanvasComponentWrapper>
    </>
  );
};

export const TriggerPreview = () => {
  return (
    <PreviewWrapper type='triggerNode'>
      <Typography>Trigger</Typography>
      <Typography variant='body2' color='text.secondary'>
        Incoming API Call
      </Typography>
    </PreviewWrapper>
  );
};

export default Trigger;
