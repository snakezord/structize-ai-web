import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { User } from '@/types/user';

export type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    login: (user: User) =>
      set((state) => {
        state.user = user;
      }),
    logout: () =>
      set((state) => {
        state.user = null;
      }),
  }))
);

export default useAuthStore;
