import { Entity } from '@/types/entity';

export type User = {
  name: string;
  email: string;
} & Entity;
