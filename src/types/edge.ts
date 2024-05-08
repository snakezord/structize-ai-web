import { Entity } from '@/types/entity';

export type Edge = {
  source: string;
  target: string;
} & Entity;
