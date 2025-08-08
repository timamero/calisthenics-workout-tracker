import { supabaseClient } from '@cwt/auth/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const options = null;

export const supabase = supabaseClient(supabaseUrl, supabaseAnonKey, options);
