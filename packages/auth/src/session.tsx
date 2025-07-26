/***
 * Retrieve the current session from Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @returns {Promise<Object|null>} The current session object or null if an error occurred.
 * @throws Will log an error if retrieving the session fails.
 */
import { SupabaseClient } from '@supabase/supabase-js';

export const session = async (supabase:SupabaseClient) => {
  console.log('Retrieving session from Supabase...');
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error retrieving session', error)
    return null
  }
  console.log('Session retrieved successfully')
  return data.session
}