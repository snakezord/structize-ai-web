'use client';
import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Node,
  NodeTypes,
  ReactFlowInstance,
  XYPosition,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { useShallow } from 'zustand/react/shallow';

import 'reactflow/dist/style.css';

import Action from '@/components/canvas/components/actions/get-request-action';
import Trigger from '@/components/canvas/components/trigger';
import { RootStyle } from '@/components/canvas/styled-wrapper';
import { MenuButton } from '@/components/menu';

const connectionLineStyle = { stroke: '#fff' };

const nodeTypes: NodeTypes = {
  actionNode: Action,
  triggerNode: Trigger,
};

const defaultViewport = { x: 0, y: 0, zoom: 0.8 };

import useStore, { RFState, selector } from './store/canvas-store';

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const { onConnect, nodes, edges, setNodes, onEdgesChange, onNodesChange } =
    useStore<RFState>(useShallow(selector));

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (reactFlowInstance) {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        } as XYPosition);

        const newNode: Node = {
          id: uuidv4(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);
      }
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <RootStyle ref={reactFlowWrapper} className='reactflow-wrapper'>
      <ReactFlow
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        defaultViewport={defaultViewport}
        attributionPosition='bottom-left'
      >
        <MenuButton />
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </RootStyle>
  );
};

export default Canvas;
