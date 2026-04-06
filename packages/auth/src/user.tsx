/***
 * Retrieve the current user from Supabase authentication.
 * @param {Object} supabase - The Supabase client instance.
 * @returns {Promise<Object|null>} The current user object or null if an error occurred.
 */
import { SupabaseClient } from "@supabase/supabase-js";

export const user = async (supabase: SupabaseClient) => {
  console.log("user || calling supabase.auth.getUser");
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
