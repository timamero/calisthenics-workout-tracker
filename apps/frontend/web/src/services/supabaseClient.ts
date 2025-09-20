import { supabaseClient } from '@cwt/auth/supabase';
import type { SupabaseClient } from '@cwt/auth/types';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const options = null;

// export const supabase = supabaseClient(supabaseUrl, supabaseAnonKey, options);

let supabase: SupabaseClient;
try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const options = null;

  supabase = supabaseClient(supabaseUrl, supabaseAnonKey, options);
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  throw error;
}

export { supabase };
