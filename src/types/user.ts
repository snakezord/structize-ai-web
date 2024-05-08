import { Entity } from '@/types/entity';

export type NewUser = {
  name: string;
  email: string;
  picture?: string;
};

export type User = NewUser & Entity;
