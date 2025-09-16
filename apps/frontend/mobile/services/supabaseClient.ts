import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line import/no-unresolved
import { supabaseClient } from '@cwt/auth/supabase';

let supabase;
try {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
  const options = {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  };
  supabase = supabaseClient(supabaseUrl, supabaseAnonKey, options);
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  throw error;
}

export { supabase };
