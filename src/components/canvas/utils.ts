import omit from 'lodash/omit';
import { Edge, Node } from 'reactflow';

import { Action, ActionNew, ActionType } from '@/types/action';

export const isConnectedEdge = (edge: Edge, nodeIds: string[]) =>
  nodeIds.includes(edge.source) && nodeIds.includes(edge.target);

const mapNodeToAction = (actionNodes: Node<ActionNew>[]): Action[] =>
  actionNodes.map((a) => ({
    nodeId: a.id,
    _id: a.id,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    ...(omit(a.data, 'label') as ActionNew),
  }));

export const getTriggerActions = (
  triggerNodeId: string,
  edges: Edge[],
  nodes: Node[]
) => {
  const connectedEdges = edges.filter((e) => e.source === triggerNodeId);
  const actionNodesIds = connectedEdges.map((e) => e.target);
  const actionNodes = nodes.filter((n) =>
    actionNodesIds.includes(n.id)
  ) as Node<ActionNew & { label: string; type: ActionType }>[];
  const actions = mapNodeToAction(actionNodes);
  return actions;
};
