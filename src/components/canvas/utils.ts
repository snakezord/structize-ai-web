import { Edge, Node } from 'reactflow';

import { ActionData, ActionNode, ActionNodeNew } from '@/types/action';
import { Edge as CustomEdge } from '@/types/edge';
import { TriggerData, TriggerNodeNew } from '@/types/trigger';

export const isConnectedEdge = (edge: Edge, nodeIds: string[]) =>
  nodeIds.includes(edge.source) && nodeIds.includes(edge.target);

export const getActiveTriggerActions = (
  triggerNodeId: string,
  edges: Edge[],
  nodes: Node[]
) => {
  const connectedEdges = edges.filter((e) => e.source === triggerNodeId);
  const actionNodesIds = connectedEdges.map((e) => e.target);
  const actionNodes = nodes.filter((n) =>
    actionNodesIds.includes(n.id)
  ) as ActionNodeNew[];
  const actions = actionNodes.map(mapNode) as ActionNode[];
  return actions;
};

export const mapNode = (node: TriggerNodeNew | ActionNodeNew) => ({
  ...node,
  _id: node.id,
  data: {
    ...node.data,
  } satisfies TriggerData | ActionData,
});

export const mapEdge = (edge: Edge): CustomEdge => ({
  _id: edge.id,
  source: edge.source,
  target: edge.target,
});
