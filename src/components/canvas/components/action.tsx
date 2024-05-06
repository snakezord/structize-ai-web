import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';

import {
  CanvasComponentWrapper,
  PreviewWrapper,
} from '@/components/canvas/components/wrapper';
import {
  ActionT,
  useActionValidation,
} from '@/components/canvas/hooks/use-action-validadtion';
import useStore from '@/components/canvas/store/canvas-store';
import { FormProvider } from '@/components/shared/inputs/RHF/form-provider';
import RHFTextField from '@/components/shared/inputs/RHF/RHF-text-field';

const Action = (props: NodeProps) => {
  const methods = useActionValidation();

  const { watch } = methods;

  const [nodes, setNodes] = useStore(
    useShallow((state) => [state.nodes, state.setNodes])
  );

  const handleDelete = () => {
    setNodes(nodes.filter((node) => node.id !== props.id));
  };

  const updateNode = useCallback(
    (values: ActionT) => {
      const isValid = methods.formState.isValid;
      if (!isValid) return;

      const updatedNodes = nodes.map((node) => {
        if (node.id === props.id) {
          return { ...node, data: { ...node.data, ...values } };
        }
        return node;
      });
      setNodes(updatedNodes);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [methods.formState.isValid, props.id, setNodes]
  );

  const { inputName, inputValue, url } = watch();

  useEffect(() => {
    updateNode({ inputName, inputValue, url });
  }, [inputName, inputValue, updateNode, url]);

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ background: '#555', width: 15, height: 15 }}
        isConnectable={props.isConnectable}
      />
      <CanvasComponentWrapper name='ACTION' handleDelete={handleDelete}>
        <FormProvider methods={methods}>
          <Stack gap={2.5}>
            <RHFTextField
              variant='outlined'
              name='url'
              label='URL'
              placeholder='https://api.structize.com/hello_world'
              fullWidth
            />
            <Stack direction='row' gap={2.5}>
              <RHFTextField
                variant='outlined'
                name='inputName'
                label='Input name'
                placeholder='Trigger input'
                fullWidth
              />
              <RHFTextField
                variant='outlined'
                name='inputValue'
                label='Input Value'
                placeholder='Trigger input value'
                fullWidth
              />
            </Stack>
          </Stack>
        </FormProvider>
      </CanvasComponentWrapper>
    </>
  );
};

export default Action;

export const ActionPreview = () => {
  return (
    <PreviewWrapper type='actionNode'>
      <Typography>Action</Typography>
      <Typography variant='body2' color='text.secondary'>
        Outgoing API Call - GET
      </Typography>
    </PreviewWrapper>
  );
};
