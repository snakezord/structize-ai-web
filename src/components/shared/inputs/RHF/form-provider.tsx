/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, ReactNode } from 'react';
// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  autoComplete?: 'off' | 'on';
};

export const FormProvider: FC<Props> = ({
  children,
  onSubmit,
  methods,
  autoComplete = 'off',
}) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} autoComplete={autoComplete}>
        {children}
      </form>
    </Form>
  );
};
