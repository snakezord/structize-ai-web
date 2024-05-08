import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';

import { useActionValidation } from '@/hooks/validations/use-get-request-action-validadtion';

import {
  CanvasComponentWrapper,
  PreviewWrapper,
} from '@/components/canvas/components/wrapper';
import { FormProvider } from '@/components/shared/inputs/RHF/form-provider';
import RHFTextField from '@/components/shared/inputs/RHF/RHF-text-field';

import useStore from '@/store/canvas-store';

import { GetRequestAction } from '@/types/action';

const Action = (props: NodeProps<GetRequestAction>) => {
  const methods = useActionValidation();

  const { watch } = methods;

  const [setNodes] = useStore(useShallow((state) => [state.setNodes]));

  const handleDelete = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== props.id));
  }, [props.id, setNodes]);

  const updateNode = useCallback(
    (values: GetRequestAction) => {
      const isValid = methods.formState.isValid;

      setNodes<GetRequestAction>((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: { ...node.data, ...values, isValid } as GetRequestAction,
            };
          }
          return node;
        })
      );
    },
    [methods.formState.isValid, props.id, setNodes]
  );

  const { inputName, inputValue, url } = watch();

  useEffect(() => {
    updateNode({ inputName, inputValue, url, type: 'GET_REQUEST' });
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
