import { create } from 'zustand';

interface AuthState {
  supabase: any; // Replace 'any' with your Supabase client type if available
  setSupabase: (client: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  supabase: null,
  setSupabase: (client) => set({ supabase: client }),
}));