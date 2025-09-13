import { StateCreator } from 'zustand';

export interface AuthSlice {
  session: any; // Replace 'any' with SupabaseSession type if available
  user: any; // Replace 'any' with SupabaseUser type if available
  loading: boolean;
  setSession: (session: any) => void;
  setUser: (user: any) => void;
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
