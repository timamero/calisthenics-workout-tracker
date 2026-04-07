/***
 * Sign out a user using Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @throws Will log an error if signing out fails.
 */
import { SupabaseClient } from "@supabase/supabase-js";

export const signOut = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out user:", error);
    return null;
  }
};
