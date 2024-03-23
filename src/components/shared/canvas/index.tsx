'use client';
import { Box, useTheme } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  NodeTypes,
  Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import 'reactflow/dist/style.css';

const Component = () => {
  return <Box>Test</Box>;
};

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20] as [number, number];
const nodeTypes: NodeTypes = {
  selectorNode: Component,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = () => {
  const theme = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const onChange = (event: { target: { value: any } }) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: '1',
        type: 'input',
        data: { label: 'An input node' },
        position: { x: 0, y: 50 },
        sourcePosition: Position.Right,
      },
      {
        id: '2',
        type: 'selectorNode',
        data: { onChange: onChange },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: '3',
        type: 'output',
        data: { label: 'Output A' },
        position: { x: 650, y: 25 },
        targetPosition: Position.Left,
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Output B' },
        position: { x: 650, y: 100 },
        targetPosition: Position.Left,
      },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: '#fff' },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)
      ),
    []
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: theme.palette.background.default }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition='bottom-left'
    >
      <Controls />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
