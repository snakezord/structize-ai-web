import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from 'reactflow';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { isConnectedEdge } from '@/components/canvas/utils';

export const selector = (state: RFState) => state;

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: <T>(update: (prevNodes: Node<T>[]) => Node[]) => void;
  setEdges: (update: (prevEdges: Edge[]) => Edge[]) => void;
};

const useCanvasStore = create<RFState>()(
  immer((set) => ({
    nodes: [],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
      set((state) => {
        state.nodes = applyNodeChanges(changes, state.nodes);
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set((state) => {
        state.edges = applyEdgeChanges(changes, state.edges);
      });
    },
    onConnect: (connection: Connection) => {
      set((state) => {
        state.edges = addEdge(connection, state.edges);
      });
    },
    setNodes: (update: (prevNodes: Node[]) => Node[]) => {
      set((state) => {
        const updatedNodes = update(state.nodes);
        state.nodes = updatedNodes;

        // Check for dependent edges
        const nodeIds = updatedNodes.map((n) => n.id);
        state.edges = state.edges.filter((e) => isConnectedEdge(e, nodeIds));
      });
    },
    setEdges: (update: (prevEdges: Edge[]) => Edge[]) => {
      set((state) => {
        state.edges = update(state.edges);
      });
    },
  }))
);

export default useCanvasStore;
