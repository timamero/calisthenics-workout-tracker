import { StateCreator } from 'zustand';

import type { Session, User } from '@cwt/auth/types';

export interface AuthSlice {
  session: Session | null;
  // session: any;
  user: User | null;
  // user: any;
  loading: boolean;
  setSession: (session: Session | null) => void;
  // setSession: (session: any) => void;
  setUser: (user: User) => void;
  // setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
  get,
) => ({
  session: null,
  user: null,
  loading: true,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
});
