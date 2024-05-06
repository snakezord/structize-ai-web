import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type SchemaT = {
  url: string;
  inputName: string;
  inputValue: string;
};

const DEFAULT: SchemaT = { url: '', inputName: '', inputValue: '' };

export const useActionValidation = (defaultValues: SchemaT = DEFAULT) => {
  const urlSchema = z
    .string()
    .min(1, { message: 'URL is required' })
    .refine(
      (url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'Invalid URL format',
      }
    );

  const schema = z.object({
    url: urlSchema,
    inputName: z.string().min(1, { message: 'Input name is required' }),
    inputValue: z.string().min(1, { message: 'Input value is required' }),
  });

  return useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: zodResolver(schema),
    defaultValues,
  });
};
