import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { User } from '@/types/user';

export const selector = (state: AuthState) => state;

export type AuthState = {
  user: User | null;
};

const useAuthStore = create<AuthState>()(
  immer(() => ({
    user: null,
  }))
);

export default useAuthStore;
