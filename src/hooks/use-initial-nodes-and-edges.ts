import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { mapToEdge } from '@/components/canvas/utils';

import useStore from '@/store/canvas-store';

import { getApiResponse } from '@/utils/get-api-response';

import { ActionNode } from '@/types/action';
import { Edge } from '@/types/edge';
import { TriggerNode } from '@/types/trigger';

export const useInitialNodesAndEdges = async () => {
  const { setNodes, setEdges } = useStore(
    useShallow((state) => ({
      setNodes: state.setNodes,
      setEdges: state.setEdges,
    }))
  );

  useEffect(() => {
    getApiResponse<{ nodes: (ActionNode | TriggerNode)[]; edges: Edge[] }>({
      apiEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/nodes-edges`,
      method: 'GET',
    }).then((result) => {
      if (result) {
        const { edges, nodes } = result;
        setNodes(() => nodes);
        setEdges(() => edges.map(mapToEdge));
      }
    });
  }, [setEdges, setNodes]);
};
