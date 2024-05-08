import { Paper, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';

import {
  CanvasComponentWrapper,
  PreviewWrapper,
} from '@/components/canvas/components/wrapper';
import {
  getActiveTriggerActions,
  mapEdge,
  mapNode,
} from '@/components/canvas/utils';
import CustomButton from '@/components/shared/button';

import useStore from '@/store/canvas-store';

import { getApiResponse } from '@/utils/get-api-response';

import { ActionNode } from '@/types/action';
import { DefaultTrigger, TriggerNode } from '@/types/trigger';

export const Trigger = (props: NodeProps) => {
  const { id } = props;

  const { nodes, setNodes, edges } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      setNodes: state.setNodes,
    }))
  );

  const [response, setResponse] = useState<object[]>([]);

  const checkConnectivity = useCallback((): boolean => {
    if (edges.length > 0 && edges.some((e) => e.source === id)) return true;
    return false;
  }, [edges, id]);

  const checkNodesValidity = useCallback((): boolean => {
    const actions = getActiveTriggerActions(id, edges, nodes);

    if (actions.every((a) => a.data.isValid)) return true;

    return false;
  }, [edges, id, nodes]);

  const [isEnabled, setIsEnabled] = useState(checkConnectivity());

  const handleDelete = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  const handleExecute = async () => {
    // Make api call
    const res = await getApiResponse<{
      result: { response: unknown; nodeId: string }[];
    }>({
      apiEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/trigger`,
      method: 'POST',
      requestData: JSON.stringify({
        nodes: nodes.map(mapNode) as (ActionNode | TriggerNode)[],
        edges: edges.map(mapEdge),
        actions: getActiveTriggerActions(id, edges, nodes),
      }),
    });

    setResponse(res?.result ?? []);
  };

  const updateNode = useCallback(
    (values: DefaultTrigger) => {
      setNodes<DefaultTrigger>((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: { ...node.data, ...values } as DefaultTrigger,
            };
          }
          return node;
        })
      );
    },
    [props.id, setNodes]
  );

  useEffect(() => {
    updateNode({ type: 'DEFAULT_TRIGGER' });
  }, [updateNode]);

  useEffect(() => {
    setIsEnabled(checkConnectivity() && checkNodesValidity());
  }, [checkConnectivity, checkNodesValidity]);

  return (
    <>
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ background: '#555', width: 15, height: 15 }}
        isConnectable={props.isConnectable}
      />
      <CanvasComponentWrapper name='TRIGGER' handleDelete={handleDelete}>
        <Stack gap={2}>
          <CustomButton
            sx={{ width: 200, alignSelf: 'center' }}
            disabled={!isEnabled}
            handleClick={handleExecute}
            size='small'
          >
            Run
          </CustomButton>
          <Paper sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Typography
              component='pre'
              whiteSpace='pre-wrap'
              textOverflow='ellipsis'
              overflow='scroll'
              className='nowheel'
              maxHeight={300}
            >
              {JSON.stringify(response, null, 2)}
            </Typography>
          </Paper>
        </Stack>
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
