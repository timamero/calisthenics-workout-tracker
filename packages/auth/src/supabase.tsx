import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with auth
export const supabaseClient = (supabaseUrl:string, supabaseAnonKey:string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided in environment variables.')
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    throw error
  }
}
