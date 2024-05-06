import { Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';

import {
  CanvasComponentWrapper,
  PreviewWrapper,
} from '@/components/canvas/components/wrapper';
import useStore from '@/components/canvas/store/canvas-store';
import CustomButton from '@/components/shared/button';

export const Trigger = (props: NodeProps) => {
  const { nodes, setNodes, edges } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      setNodes: state.setNodes,
    }))
  );

  const checkConnectivity = useCallback((): boolean => {
    const { id } = props;

    if (edges.length > 0 && edges.every((e) => e.source === id)) return true;

    return false;
  }, [edges, props]);

  const [isConnected, setIsConnected] = useState(checkConnectivity());

  const handleDelete = () => {
    setNodes(nodes.filter((node) => node.id !== props.id));
  };

  const handleExecute = () => {
    // Make api call
    // getApiResponse()
  };

  useEffect(() => {
    setIsConnected(checkConnectivity());
  }, [checkConnectivity]);

  return (
    <>
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ background: '#555', width: 15, height: 15 }}
        isConnectable={props.isConnectable}
      />
      <CanvasComponentWrapper name='TRIGGER' handleDelete={handleDelete}>
        <CustomButton
          disabled={!isConnected}
          handleClick={handleExecute}
          size='small'
        >
          Run
        </CustomButton>
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
