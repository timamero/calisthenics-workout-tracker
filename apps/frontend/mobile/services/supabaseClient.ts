// eslint-disable-next-line import/no-unresolved
import { supabaseClient } from '@cwt/auth/supabase';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase = supabaseClient(supabaseUrl, supabaseAnonKey);
