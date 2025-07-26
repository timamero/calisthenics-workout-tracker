import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line import/no-unresolved
import { supabaseClient } from '@cwt/auth/supabase';

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
export const supabase = supabaseClient(supabaseUrl, supabaseAnonKey, options);
