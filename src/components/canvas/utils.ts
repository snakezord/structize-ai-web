import { Edge } from 'reactflow';

export const isConnectedEdge = (edge: Edge, nodeIds: string[]) =>
  nodeIds.includes(edge.source) && nodeIds.includes(edge.target);
